package com.hisd3.dtr.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hisd3.dtr.domain.Authority;
import com.hisd3.dtr.domain.PersistentToken;
import com.hisd3.dtr.domain.User;
import com.hisd3.dtr.repository.AuthorityRepository;
import com.hisd3.dtr.repository.PersistentTokenRepository;
import com.hisd3.dtr.repository.UserRepository;
import com.hisd3.dtr.security.SecurityUtils;
import com.hisd3.dtr.service.MailService;
import com.hisd3.dtr.service.UserService;
import com.hisd3.dtr.web.rest.dto.KeyAndPasswordDTO;
import com.hisd3.dtr.web.rest.dto.UserDTO;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

import org.apache.commons.lang.StringUtils;
import org.joda.time.DateTime;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
public class AccountResource {

    private final Logger log = LoggerFactory.getLogger(AccountResource.class);

    @Inject
    private UserRepository userRepository;

    @Inject
    private UserService userService;

    @Inject
    private PersistentTokenRepository persistentTokenRepository;

    @Inject
    private MailService mailService;

    @Inject
    AuthorityRepository authorityRepository;

    @Inject
    private PasswordEncoder passwordEncoder;

    @RequestMapping("/deleteuser")
    public ResponseEntity deleteuser(@RequestParam Long id){


        User user= userRepository.findOne(id);
        user.setAuthorities(null);

        user = userRepository.save(user);
        userRepository.delete(user);

        return  ResponseEntity.ok().build();
    }

    @RequestMapping("/roles")
    public List<String> getRoles(){

        List<String> roles = new ArrayList<>();

        for (Authority authority : authorityRepository.findAll()) {

            roles.add(authority.getName());
        }




        return  roles;
    }
    /**
     * POST  /register -> register the user.
     */
    @RequestMapping(value = "/register",
            method = RequestMethod.POST,
            produces = MediaType.TEXT_PLAIN_VALUE)
    @Timed
    public ResponseEntity<?> registerAccount(@Valid @RequestBody UserDTO userDTO, HttpServletRequest request)  {

        try {

            String ipAddress = request.getHeader("X-FORWARDED-FOR");
            if (ipAddress == null) {
                ipAddress = request.getRemoteAddr();
            }

            HttpResponse<JsonNode> captchaResponse = Unirest.post("https://www.google.com/recaptcha/api/siteverify")
                    .field("secret", "6LciBBUTAAAAADPpKc59T4iuY-_LQ7ihmUDAfiMl")
                    .field("response", userDTO.getCaptcha())
                    .field("remoteip", ipAddress)
                    .asJson();

            if(captchaResponse.getBody()!=null)
            {
                JSONObject result = captchaResponse.getBody().getObject();
                boolean success = result.getBoolean("success");
                if(!success)
                    return new ResponseEntity<>("Captcha not validated", HttpStatus.BAD_REQUEST);

            }
        } catch (UnirestException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Captcha not validated", HttpStatus.BAD_REQUEST);
        } catch (JSONException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Captcha not validated", HttpStatus.BAD_REQUEST);
        }


        //Check captcha first
        User user = userRepository.findOneByLogin(userDTO.getLogin());
        if (user != null) {
            return ResponseEntity.badRequest().contentType(MediaType.TEXT_PLAIN).body("login already in use");
        } else {
            if (userRepository.findOneByEmail(userDTO.getEmail()) != null) {
                return ResponseEntity.badRequest().contentType(MediaType.TEXT_PLAIN).body("e-mail address already in use");
            }
            user = userService.createUserInformation(userDTO.getLogin(), userDTO.getPassword(),
            userDTO.getFirstName(), userDTO.getLastName(), userDTO.getEmail().toLowerCase(),
            userDTO.getLangKey(),
            userDTO.getCompany(),
            userDTO.getContactperson(),
                    userDTO.getContactnumber(),
                    userDTO.getAddress1(),
                    userDTO.getAddress2(),
                    userDTO.getCity(),
                    userDTO.getProvince(),
                    userDTO.getCountry(),
                    userDTO.getZipcode());

            String baseUrl = request.getScheme() + // "http"
            "://" +                            // "://"
            request.getServerName() +          // "myhost"
            ":" +                              // ":"
            request.getServerPort();           // "80"

            mailService.sendActivationEmail(user, baseUrl);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
    }

    /**
     * GET  /activate -> activate the registered user.
     */
    @RequestMapping(value = "/activate",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<String> activateAccount(@RequestParam(value = "key") String key) {
        User user = userService.activateRegistration(key);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<String>(HttpStatus.OK);
    }

    /**
     * GET  /authenticate -> check if the user is authenticated, and return its login.
     */
    @RequestMapping(value = "/authenticate",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public String isAuthenticated(HttpServletRequest request) {
        log.debug("REST request to check if the current user is authenticated");
        return request.getRemoteUser();
    }

    /**
     * GET  /account -> get the current user.
     */
    @RequestMapping(value = "/account",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserDTO> getAccount() {
        User user = userService.getUserWithAuthorities();
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        List<String> roles = new ArrayList<>();
        for (Authority authority : user.getAuthorities()) {
            roles.add(authority.getName());
        }
        UserDTO dto = new UserDTO(
                user.getLogin(),
                null,
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getLangKey(),
                roles);

        dto.setId(user.getId());
        return new ResponseEntity<>(dto
            ,
            HttpStatus.OK);
    }



    /**
     * POST  /account -> update the current user information.
     */
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(value = "/updateaccount",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<String> updateaccount(@RequestBody UserDTO userDTO) {
        User userHavingThisLogin = userRepository.findOneByLogin(userDTO.getLogin());
        if (userHavingThisLogin == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        userService.updateAnyUserInformation(
                userDTO.getLogin(),
                userDTO.getFirstName(),
                userDTO.getLastName(),
                userDTO.getEmail(),
                userDTO.getCompany(),
                userDTO.getContactperson(),
                userDTO.getContactnumber(),
                userDTO.getAddress1(),
                userDTO.getAddress2(),
                userDTO.getCity(),
                userDTO.getProvince(),
                userDTO.getCountry(),
                userDTO.getZipcode(),
                userDTO.getRoles());


        return new ResponseEntity<>(HttpStatus.OK);
    }


    /**
     * POST  /account -> update the current user information.
     */
    @RequestMapping(value = "/account",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<String> saveAccount(@RequestBody UserDTO userDTO) {
        User userHavingThisLogin = userRepository.findOneByLogin(userDTO.getLogin());
        if (userHavingThisLogin != null && !userHavingThisLogin.getLogin().equals(SecurityUtils.getCurrentLogin())) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        userService.updateCurrentUserInformation(
                userDTO.getFirstName(),
                userDTO.getLastName(),
                userDTO.getEmail(),
                userDTO.getCompany(),
                userDTO.getContactperson(),
                userDTO.getContactnumber(),
                userDTO.getAddress1(),
                userDTO.getAddress2(),
                userDTO.getCity(),
                userDTO.getProvince(),
                userDTO.getCountry(),
                userDTO.getZipcode(),
                userDTO.getRoles());


        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * POST  /change_password -> changes the current user's password
     */
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(value = "/account/change_anypassword",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<?> change_anypassword(@RequestParam String password,
                                                @RequestParam Long id) {
        if (!checkPasswordLength(password)) {
            return new ResponseEntity<>("Incorrect password", HttpStatus.BAD_REQUEST);
        }
        userService.changeAnyPassword(password, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }



    /**
     * POST  /change_password -> changes the current user's password
     */
    @RequestMapping(value = "/account/change_password",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<?> changePassword(
            @RequestParam String oldpassword,
            @RequestParam String password) {
        if (!checkPasswordLength(password)) {
            return new ResponseEntity<>("Incorrect password", HttpStatus.BAD_REQUEST);
        }

        //validate old password
        User currentUser = userRepository.findOneByLogin(SecurityUtils.getCurrentLogin());

       // String encryptedPassword = passwordEncoder.encode(oldpassword);

        if(!passwordEncoder.matches(oldpassword,currentUser.getPassword())){
            return new ResponseEntity<>("Incorrect Current Password", HttpStatus.BAD_REQUEST);
        }

        userService.changePassword(password);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * GET  /account/sessions -> get the current open sessions.
     */
    @RequestMapping(value = "/account/sessions",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<PersistentToken>> getCurrentSessions() {
        User user = userRepository.findOneByLogin(SecurityUtils.getCurrentLogin());
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(
            persistentTokenRepository.findByUser(user),
            HttpStatus.OK);
    }

    /**
     * DELETE  /account/sessions?series={series} -> invalidate an existing session.
     *
     * - You can only delete your own sessions, not any other user's session
     * - If you delete one of your existing sessions, and that you are currently logged in on that session, you will
     *   still be able to use that session, until you quit your browser: it does not work in real time (there is
     *   no API for that), it only removes the "remember me" cookie
     * - This is also true if you invalidate your current session: you will still be able to use it until you close
     *   your browser or that the session times out. But automatic login (the "remember me" cookie) will not work
     *   anymore.
     *   There is an API to invalidate the current session, but there is no API to check which session uses which
     *   cookie.
     */
    @RequestMapping(value = "/account/sessions/{series}",
            method = RequestMethod.DELETE)
    @Timed
    public void invalidateSession(@PathVariable String series) throws UnsupportedEncodingException {
        String decodedSeries = URLDecoder.decode(series, "UTF-8");
        User user = userRepository.findOneByLogin(SecurityUtils.getCurrentLogin());
        List<PersistentToken> persistentTokens = persistentTokenRepository.findByUser(user);
        for (PersistentToken persistentToken : persistentTokens) {
            if (StringUtils.equals(persistentToken.getSeries(), decodedSeries)) {
                persistentTokenRepository.delete(decodedSeries);
            }
        }
    }

    @RequestMapping(value = "/account/reset_password/init",
        method = RequestMethod.POST,
        produces = MediaType.TEXT_PLAIN_VALUE)
    @Timed
    public ResponseEntity<?> requestPasswordReset(@RequestBody String mail, HttpServletRequest request) {

        mail = StringUtils.replace(mail,"\"","");

        User user = userService.requestPasswordReset(mail);

        if (user != null) {
          String baseUrl = request.getScheme() +
              "://" +
              request.getServerName() +
              ":" +
              request.getServerPort();
          mailService.sendPasswordResetMail(user, baseUrl);
          return new ResponseEntity<>("e-mail was sent", HttpStatus.OK);
        } else {
          return new ResponseEntity<>("e-mail address not registered", HttpStatus.BAD_REQUEST);
        }
        
    }

    @RequestMapping(value = "/account/validate_resetpassword_key",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<String> validate_resetpassword_key(@RequestParam String key) {
        User user = userRepository.findOneByResetKey(key);
        if (user != null) {

            DateTime oneDayAgo = DateTime.now().minusHours(24);
            if (user.getResetDate().isAfter(oneDayAgo.toInstant().getMillis()))
                return new ResponseEntity<String>(HttpStatus.OK);
            else
                return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/account/reset_password/finish",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<String> finishPasswordReset(@RequestBody KeyAndPasswordDTO keyAndPassword) {
        if (!checkPasswordLength(keyAndPassword.getNewPassword())) {
            return new ResponseEntity<>("Incorrect password", HttpStatus.BAD_REQUEST);
        }
        User user = userService.completePasswordReset(keyAndPassword.getNewPassword(), keyAndPassword.getKey());
        if (user != null) {
          return new ResponseEntity<String>(HttpStatus.OK);
        } else {
          return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private boolean checkPasswordLength(String password) {
      return (!StringUtils.isEmpty(password) && password.length() >= UserDTO.PASSWORD_MIN_LENGTH && password.length() <= UserDTO.PASSWORD_MAX_LENGTH);
    }

}
