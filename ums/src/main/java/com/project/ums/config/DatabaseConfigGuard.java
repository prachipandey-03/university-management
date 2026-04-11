package com.project.ums.config;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.context.EnvironmentAware;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class DatabaseConfigGuard implements BeanFactoryPostProcessor, EnvironmentAware {

    private static final String USERNAME_SENTINEL = "__SET_DB_USERNAME__";
    private static final String PASSWORD_SENTINEL = "__SET_DB_PASSWORD__";

    private Environment environment;

    @Override
    public void setEnvironment(Environment environment) {
        this.environment = environment;
    }

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        String url = environment.getProperty("spring.datasource.url", "");
        if (!url.startsWith("jdbc:mysql:")) {
            return;
        }

        String username = environment.getProperty("spring.datasource.username", "");
        String password = environment.getProperty("spring.datasource.password", "");

        if (USERNAME_SENTINEL.equals(username) || PASSWORD_SENTINEL.equals(password)) {
            throw new IllegalStateException(
                    "MySQL credentials are not configured. Set spring.datasource.username and " +
                            "spring.datasource.password in ums/local-db.properties, or set the " +
                            "UMS_DB_USERNAME and UMS_DB_PASSWORD environment variables. " +
                            "If you need a dedicated database user, run ums/mysql/init-ums.sql first."
            );
        }
    }
}
