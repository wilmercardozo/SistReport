package com.uan.sistreport.sistreport.entity;


import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;
public class JwtRequest implements Serializable {
    private static final long serialVersionUID = 5926468583005150707L;

    private String username;
    private String password;
    private String canal;

    //need default constructor for JSON Parsing
    public JwtRequest()
    {

    }
    public JwtRequest(String username, String password) {
        this.setUsername(username);
        this.setPassword(password);
    }

    public String getUsername() {
        return this.username;
    }
    @JsonProperty("username")
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return this.password;
    }
    @JsonProperty("password")
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * @return the canal
     */
    public String getCanal() {
        return canal;
    }

    /**
     * @param canal the canal to set
     */
    @JsonProperty("canal")
    public void setCanal(String canal) {
        this.canal = canal;
    }
}
