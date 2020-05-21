package com.uan.sistreport.config;

import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.StringHttpMessageConverter;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class FastjsonConverter {

	@Bean
	public HttpMessageConverters customConverters() {
		FastJsonHttpMessageConverter fastConverter = new FastJsonHttpMessageConverter();
		FastJsonConfig fastJsonConfig = new FastJsonConfig();
		List<MediaType> fastMediaTypes = new ArrayList<>();
		fastJsonConfig.setCharset(StandardCharsets.UTF_8);
		fastMediaTypes.add(MediaType.APPLICATION_JSON);
		fastConverter.setSupportedMediaTypes(fastMediaTypes);
		fastConverter.setFastJsonConfig(fastJsonConfig);
		StringHttpMessageConverter stringConverter = new StringHttpMessageConverter();
		stringConverter.setDefaultCharset(StandardCharsets.UTF_8);
		stringConverter.setSupportedMediaTypes(fastMediaTypes);
		return new HttpMessageConverters(stringConverter,fastConverter);
	}
}