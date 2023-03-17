package io.github.lkwid.cucumber;

import io.cucumber.spring.CucumberContextConfiguration;
import io.github.lkwid.IntegrationTest;
import org.springframework.test.context.web.WebAppConfiguration;

@CucumberContextConfiguration
@IntegrationTest
@WebAppConfiguration
public class CucumberTestContextConfiguration {}
