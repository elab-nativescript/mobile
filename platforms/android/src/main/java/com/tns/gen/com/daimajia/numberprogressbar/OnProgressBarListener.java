package com.tns.gen.com.daimajia.numberprogressbar;

public class OnProgressBarListener implements com.daimajia.numberprogressbar.OnProgressBarListener {
	public OnProgressBarListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onProgressChange(int param_0, int param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onProgressChange", void.class, args);
	}

}
