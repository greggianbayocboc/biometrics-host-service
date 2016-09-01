package com.hisd3.dtr;

import com.google.common.base.Joiner;
import com.hisd3.dtr.config.Constants;
import com.hisd3.dtr.jar.JarFileUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.autoconfigure.MetricFilterAutoConfiguration;
import org.springframework.boot.actuate.autoconfigure.MetricRepositoryAutoConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.env.Environment;
import org.springframework.core.env.SimpleCommandLinePropertySource;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.Collection;

/**
 * Created by albertoclarit on 9/21/15.
 * Copied from JHipster
 */
@ComponentScan
@EnableAutoConfiguration(exclude = {MetricFilterAutoConfiguration.class, MetricRepositoryAutoConfiguration.class})
@EnableSpringDataWebSupport // allow use of PagedResourcesAssembler
public class Application{

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Inject
    private Environment env;

    /**
     * Initializes HIS_Regiousoft.
     * <p/>
     * Spring profiles can be configured with a program arguments --spring.profiles.active=your-active-profile
     * <p/>
     * <p>
     * You can find more information on how profiles work with JHipster on <a href="http://jhipster.github.io/profiles.html">http://jhipster.github.io/profiles.html</a>.
     * </p>
     */
    @PostConstruct
    public void initApplication() throws IOException {
        if (env.getActiveProfiles().length == 0) {
            log.warn("No Spring profile configured, running with default configuration");
        } else {
            log.info("Running with Spring profile(s) : {}", Arrays.toString(env.getActiveProfiles()));
            Collection<String> activeProfiles = Arrays.asList(env.getActiveProfiles());
            if (activeProfiles.contains(Constants.SPRING_PROFILE_DEVELOPMENT) && activeProfiles.contains(Constants.SPRING_PROFILE_PRODUCTION)) {
                log.error("You have misconfigured your application! " +
                        "It should not run with both the 'dev' and 'prod' profiles at the same time.");
            }
            if (activeProfiles.contains(Constants.SPRING_PROFILE_PRODUCTION) && activeProfiles.contains(Constants.SPRING_PROFILE_FAST)) {
                log.error("You have misconfigured your application! " +
                        "It should not run with both the 'prod' and 'fast' profiles at the same time.");
            }
            if (activeProfiles.contains(Constants.SPRING_PROFILE_DEVELOPMENT) && activeProfiles.contains(Constants.SPRING_PROFILE_CLOUD)) {
                log.error("You have misconfigured your application! " +
                        "It should not run with both the 'dev' and 'cloud' profiles at the same time.");
            }
        }
    }

    /**
     * Main method, used to run the application.
     */
    public static void main(String[] args) throws UnknownHostException {
        // initReport();
        SpringApplication app = new SpringApplication(Application.class);
        //app.setShowBanner(false);
        SimpleCommandLinePropertySource source = new SimpleCommandLinePropertySource(args);
        addDefaultProfile(app, source);
        addLiquibaseScanPackages();
        Environment env = app.run(args).getEnvironment();
        log.info("Access URLs:\n----------------------------------------------------------\n\t" +
                        "Local: \t\thttp://127.0.0.1:{}\n\t" +
                        "External: \thttp://{}:{}\n----------------------------------------------------------",
                env.getProperty("server.port"),
                InetAddress.getLocalHost().getHostAddress(),
                env.getProperty("server.port"));

    }

    private static void initReport() {

        String userdirectory= System.getProperty("user.dir");

        if(!StringUtils.startsWith(userdirectory, "/")){
            userdirectory = "/" + userdirectory.replace("\\","/");
        }

        if(onJar()) {

            File reports = new File(userdirectory + "/reports");
            if (reports.exists())
                reports.delete();
            reports.mkdir();

            try {
                JarFileUtils.copyResourcesRecursively(new URL("jar:file:" + userdirectory + "/Vizdashop.jar!/reports/"), reports);
            } catch (MalformedURLException e) {
                e.printStackTrace();
            }
        }


    }

    /**
     * If no profile has been configured, set by default the "dev" profile.
     */
    private static void addDefaultProfile(SpringApplication app, SimpleCommandLinePropertySource source) {
        if (!source.containsProperty("spring.profiles.active") &&
                !System.getenv().containsKey("SPRING_PROFILES_ACTIVE")) {

            app.setAdditionalProfiles(Constants.SPRING_PROFILE_DEVELOPMENT);
        }
    }

    /**
     * Set the liquibases.scan.packages to avoid an exception from ServiceLocator.
     */
    private static void addLiquibaseScanPackages() {
        System.setProperty("liquibase.scan.packages", Joiner.on(",").join(
                "liquibase.change", "liquibase.database", "liquibase.parser",
                "liquibase.precondition", "liquibase.datatype",
                "liquibase.serializer", "liquibase.sqlgenerator", "liquibase.executor",
                "liquibase.snapshot", "liquibase.logging", "liquibase.diff",
                "liquibase.structure", "liquibase.structurecompare", "liquibase.lockservice",
                "liquibase.ext", "liquibase.changelog"));
    }


    private static Boolean isJar=null;
    public static boolean onJar(){

        if(isJar==null){
            String userdirectory=   System.getProperty("user.dir");
            isJar = new File(userdirectory+"/Vizdashop.jar").exists();
        }

        return isJar;

    }

    public static  String getUD(){


        String userdirectory=  System.getProperty("user.dir");//Application.class.getProtectionDomain().getCodeSource().getLocation().getPath()


        return "file:/"+userdirectory;


    }
}
