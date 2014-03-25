package com.test.f5.d3.test2.client;

import com.google.gwt.resources.client.ClientBundle;
import com.google.gwt.resources.client.TextResource;

public interface MyJSBundle extends ClientBundle {

	@Source("js/d3Charts.js")
	TextResource myExtensionJS();
}