package com.uan.sistreport.sistreport.service;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {


    @Autowired
    IdentityService identityService;

    /**
     * El username se manda con formato: usuario:canal
     *
     * @param username
     * @return
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String[] data = username.split(":");
        String pass = "";
        try {
            pass = identityService.validateIdentity(data[0]);
        }catch (Exception e){
            e.printStackTrace();
        }
        if (pass != null && !pass.isEmpty()) {
            return new User(username, pass, new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        /*if ("javainuse".equals(username)) {
         return new User("javainuse", "$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6",
         new ArrayList<>());
         } else {
         throw new UsernameNotFoundException("User not found with username: " + username);
         }*/
    }
}
