package com.hisd3.dtr.web.rest.dto;

import org.hibernate.validator.constraints.Email;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class UserDTO {

    public static final int PASSWORD_MIN_LENGTH = 5;
    public static final int PASSWORD_MAX_LENGTH = 100;

   // @Pattern(regexp = "^[a-z0-9]*$")
    @NotNull
    @Size(min = 1, max = 50)
    private String login;

    @NotNull
    @Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
    private String password;

    @Size(max = 50)
    private String firstName;

    @Size(max = 50)
    private String lastName;

    @Email
    @Size(min = 5, max = 100)
    private String email;

    @Size(min = 2, max = 5)
    private String langKey;


    private String company;

    private String contactperson;


    private String contactnumber;


    private String address1;


    private String address2;


    private String city;


    private String province;


    private String country;


    private String zipcode;

    private String captcha;


    private List<String> roles;

    private Long id;

    public void setId(Long id) {
        this.id = id;
    }

    public UserDTO() {
    }

    public String getCaptcha() {
        return captcha;
    }

    public void setCaptcha(String captcha) {
        this.captcha = captcha;
    }

    public UserDTO(String login, String password, String firstName, String lastName, String email, String langKey,
                   List<String> roles) {
        this.login = login;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.langKey = langKey;
        this.roles = roles;
    }

    public UserDTO(String login, String password, String firstName, String lastName, String email, String langKey,
                   String company,String contactperson, String contactnumber, String address1, String address2, String city, String province, String country, String zipcode, List<String> roles) {
        this.login = login;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.langKey = langKey;
        this.company = company;
        this.contactperson = contactperson;
        this.contactnumber = contactnumber;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.province = province;
        this.country = country;
        this.zipcode = zipcode;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public String getPassword() {
        return password;
    }

    public String getLogin() {
        return login;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getLangKey() {
        return langKey;
    }

    public List<String> getRoles() {
        return roles;
    }

    public String getCompany() {
        return company;
    }

    public String getContactperson() {
        return contactperson;
    }

    public String getContactnumber() {
        return contactnumber;
    }

    public String getAddress1() {
        return address1;
    }

    public String getAddress2() {
        return address2;
    }

    public String getCity() {
        return city;
    }

    public String getProvince() {
        return province;
    }

    public String getCountry() {
        return country;
    }

    public String getZipcode() {
        return zipcode;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "login='" + login + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", langKey='" + langKey + '\'' +
                ", contactperson='" + contactperson + '\'' +
                ", contactnumber='" + contactnumber + '\'' +
                ", address1='" + address1 + '\'' +
                ", address2='" + address2 + '\'' +
                ", city='" + city + '\'' +
                ", province='" + province + '\'' +
                ", country='" + country + '\'' +
                ", zipcode='" + zipcode + '\'' +
                ", roles=" + roles +
                '}';
    }
}
