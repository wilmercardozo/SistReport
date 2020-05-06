package com.uan.sistreport.sistreport.util;

import com.google.common.hash.Hashing;
import java.nio.charset.StandardCharsets;

public class SecurityUtils {

    public static String hashText(String originalString) {
        String sha256hex = Hashing.sha256()
                .hashString(originalString, StandardCharsets.UTF_8)
                .toString();
        return sha256hex;
    }
}
