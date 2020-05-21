package com.uan.sistreport.util;

import com.google.common.hash.Hashing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.nio.charset.StandardCharsets;

public class SecurityUtils {

    public static String hashText(String originalString) {
        String sha256hex = Hashing.sha256()
                .hashString(originalString, StandardCharsets.UTF_8)
                .toString();
        return sha256hex;
    }

    public static String bcryptPassword(String password){
        BCryptPasswordEncoder encoder = new  BCryptPasswordEncoder();
        return encoder.encode(password);
    }
}
