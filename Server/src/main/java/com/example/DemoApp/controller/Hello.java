package com.example.DemoApp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Hello {
@RequestMapping("/")
public String greet() {
	return "Hellow world ,Welocome to Spring project moved to controller tata ";
}

}
