package com.test.f5.d3.test2.client;

import com.google.gwt.user.client.Element;
import com.google.gwt.user.client.ui.ComplexPanel;

public class SvgPanel extends ComplexPanel {

	private static final String SVG_NAMESPACE = "http://www.w3.org/2000/svg";

	public SvgPanel(String svgId) {
		Element svgPanelElement = createElementNS(SVG_NAMESPACE, "svg");
		svgPanelElement.setAttribute("id", svgId);
		svgPanelElement.setAttribute("class", "svgGraph");
		setElement(svgPanelElement);

		// showcaseSVG(); // Demonstrate that SVG works! Inexplicably!
	}

	private void showcaseSVG() {
		Element svgElement = createElementNS(SVG_NAMESPACE, "circle");
		svgElement.setAttribute("cx", "50");
		svgElement.setAttribute("cy", "50");
		svgElement.setAttribute("r", "30");
		getElement().appendChild(svgElement);
	}

	private static native Element createElementNS(final String ns,
			final String name)/*-{
		return document.createElementNS(ns, name);
	}-*/;
}