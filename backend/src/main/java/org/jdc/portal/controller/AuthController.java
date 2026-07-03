package org.jdc.portal.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {


    public ResponseEntity<String> login() {
        return ResponseEntity.ok("Login");
    }
}
