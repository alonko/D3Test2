package com.test.f5.d3.test2.client;

import java.util.ArrayList;
import java.util.List;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.core.client.GWT;
import com.google.gwt.core.client.JavaScriptObject;
import com.google.gwt.core.client.JsArrayNumber;
import com.google.gwt.user.client.DOM;
import com.google.gwt.user.client.Element;
import com.google.gwt.user.client.ui.RootPanel;

/**
 * Entry point classes define <code>onModuleLoad()</code>.
 */
public class D3Test2 implements EntryPoint {
	/**
	 * This is the entry point method.
	 */
	public void onModuleLoad() {
		MyJSBundle bundle = GWT.create(MyJSBundle.class);
		MyJavaScriptInjector.inject(bundle.myExtensionJS().getText());

		drawGraphs();
	}

	private void drawGraphs() {
		SvgPanel svgPanel = new SvgPanel("svgBarsGraph");
		RootPanel.get("graphContainer").add(svgPanel);
		createSvgBarchart();

		SvgPanel svgPanel1 = new SvgPanel("svgRotatedGraph");
		RootPanel.get("graphContainer").add(svgPanel1);
		createSvgRotatedBarchart();

		createDivChart();

		createSvgRotatedBarchartWithBars();

		SvgPanel svgPanel2 = new SvgPanel("svgDinamicData");
		RootPanel.get("graphContainer").add(svgPanel2);
		createSvgBarchartWithDinamicData();

		SvgPanel svgPanel3 = new SvgPanel("svgDonutChart");
		RootPanel.get("graphContainer").add(svgPanel3);
		createDonutChart();
	}

	private void createDivChart() {
		List<Double> data = new ArrayList<Double>();
		for (int i = 0; i < 10; i++) {
			data.add(Math.random() + .1);
		}

		JsArrayNumber jsData = createData(data);

		Element parent = RootPanel.getBodyElement();
		Element divElement = DOM.createDiv();
		divElement.setAttribute("class", "divChart");
		parent.appendChild(divElement);
		createDivBarchart(divElement, jsData);
	}

	private JsArrayNumber createData(List<Double> data) {
		JsArrayNumber jsData = JavaScriptObject.createArray().cast();
		for (int i = 0; i < data.size(); i++) {
			jsData.push(data.get(i));
		}
		return jsData;
	}

	private native void createDivBarchart(Element element, JsArrayNumber jsData) /*-{
		$wnd.draw_barchart(element, jsData);
	}-*/;

	private native void createSvgBarchart() /*-{
		$wnd.draw_svg_barchart();
	}-*/;

	private native void createSvgRotatedBarchart() /*-{
		$wnd.draw_svg_rotated_barchart();
	}-*/;

	private native void createSvgRotatedBarchartWithBars() /*-{
		$wnd.draw_svg_rotated_barchart_with_bars();
	}-*/;

	private native void createSvgBarchartWithDinamicData() /*-{
		$wnd.dinamicData();
		$wnd.dinamicData2();
	}-*/;

	private native void createDonutChart() /*-{
		$wnd.drawDonut();
	}-*/;

}