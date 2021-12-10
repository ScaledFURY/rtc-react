import React from 'react'
import { Link } from "react-router-dom";
import { CartDisplay } from "rtc-react";

function CCMonthOptions() {
  return (
    <>
    <option value="">- Select Exp Month -</option>
    <option value="1">01 - January</option>
    <option value="2">02 - Febuary</option>
    <option value="3">03 - March</option>
    <option value="4">04 - April</option>
    <option value="5">05 - May</option>
    <option value="6">06 - June</option>
    <option value="7">07 - July</option>
    <option value="8">08 - August</option>
    <option value="9">09 - September</option>
    <option value="10">10 - October</option>
    <option value="11">11 - November</option>
    <option value="12">12 - December</option>
    </>
  );
}

function CCYearOptions() {
  const curYear = (new Date()).getFullYear();
  const expirations = [(<option value="" key="year_choice_null">- Select Exp Year -</option>)];
  for (let year=curYear; year < (curYear+25); year++) {
    expirations.push(<option value={year} key={`year_choice${year}`}>{year}</option>);
  }

  return (
    <>
    {expirations}
    </>
  );
}

export function Checkout(props:any) {

  React.useEffect(() => {
    props.rtcApi.firePageView({
      pageType: "lander",
      landingPageName: "example",
      isCheckoutPage: true
    });
    if (!props.rtcApi.cartLoaded()) {
      props.rtcApi.loadCart({
        landingPageName: "example",
        defaultVariantId:"40194513993914",
        defaultAddons:"39518515298490",
        urlCoupon: "STEPHEN"
      });
    }
  }, [ props.rtcApi ]);

  const [ checkoutProps, setCheckoutProps ] = React.useState({
    "accepts_marketing": true,
    "accepts_attentive": false,
    "shipping": {
        "first_name": "",
        "last_name": "",
        "address1": "",
        "address2": "",
        "city": "",
        "state": "",
        "postal_code": "",
        "country": "US",
        "phone": ""
    },
    "billing": {
        "first_name": "",
        "last_name": "",
        "address1": "",
        "address2": "",
        "city": "",
        "state": "",
        "postal_code": "",
        "country": "US",
        "phone": ""
    },
    "email": "",
    "billing_use_shipping": true,
    "cc_number": "",
    "cc_exp_month": "",
    "cc_exp_year": "",
    "cc_cvv": "",
    "combo_mode": "credit"
  });

  function doPurchase(e:any) {
    e.preventDefault();
    alert(JSON.stringify(checkoutProps, null, 4));
  }

  function onEmailBlur(e:any) {

    const validateEmail = (em:string) => {
        // eslint-disable-next-line no-useless-escape
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(em).toLowerCase());
    }
    if (validateEmail(e.target.value)) {
      props.rtcApi.fireCheckoutStarted({ email: e.target.value });
    }
  }

  function toggleChangeHandler(e:any) {
    const newProps = Object.assign({}, checkoutProps);
    newProps[e.target.name] = !newProps[e.target.name];
    setCheckoutProps(newProps);
  }

  function billingUseShippingChangeHandler(e:any) {
    const newProps = Object.assign({}, checkoutProps);
    newProps[e.target.name] = e.target.value === "true";
    setCheckoutProps(newProps);
  }

  function comboModeChangeHandler(e:any) {
    const newProps = Object.assign({}, checkoutProps);
    newProps[e.target.name] = e.target.value;
    setCheckoutProps(newProps);
  }

  function textChangeHandler(e:any) {
    const newProps = Object.assign({}, checkoutProps);
    if (e.target.name.match(/shipping_/)) {
      const field = e.target.name.replace(/shipping_/, "");
      newProps.shipping[field] = e.target.value;
    } else if (e.target.name.match(/billing_/)) {
      const field = e.target.name.replace(/billing_/, "");
      newProps.billing[field] = e.target.value;
    } else {
      newProps[e.target.name] = e.target.value;
    }
    setCheckoutProps(newProps);
  }

  return (
    <>
    <Link to="/">Back to Lander</Link>
    <CartDisplay />
    <hr />

    <form className="checkout-combo-form" method="post">
          <h4>Contact Information</h4>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" value={checkoutProps.email} onChange={textChangeHandler} onBlur={onEmailBlur} />
          </div>

          <h4>Shipping Address</h4>

          <div className="form-group">
            <label htmlFor="shipping_first_name">First Name</label>
            <input type="text" id="shipping_first_name" name="shipping_first_name"  value={checkoutProps.shipping.first_name} onChange={textChangeHandler} />
          </div>

          <div className="form-group">
            <label htmlFor="shipping_last_name">Last Name</label>
            <input id="shipping_last_name" type="text" name="shipping_last_name" value={checkoutProps.shipping.last_name} onChange={textChangeHandler} />
          </div>

          <div className="form-group">
            <label htmlFor="shipping_address_1">Address 1</label>
            <input id="shipping_address_1" type="text" name="shipping_address1" value={checkoutProps.shipping.address1} onChange={textChangeHandler} />
          </div>

          <div className="form-group">
            <label htmlFor="shipping_address_2">Address 2</label>
            <input id="shipping_address_2" type="text" name="shipping_address2" value={checkoutProps.shipping.address2} onChange={textChangeHandler} />
          </div>

          <div className="form-group">
            <label htmlFor="shipping_city">City</label>
            <input id="shipping_city" type="text" name="shipping_city" value={checkoutProps.shipping.city} onChange={textChangeHandler} />
          </div>

          <div className="form-group">
            <label htmlFor="shipping_state">State</label>
            <select id="shipping_state" name="shipping_state" value={checkoutProps.shipping.state} onChange={textChangeHandler}>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="shipping_postal_code">ZIP Code</label>
            <input type="text" name="shipping_postal_code" value={checkoutProps.shipping.postal_code} onChange={textChangeHandler} />
          </div>

          <div className="form-group">
            <label htmlFor="shipping_country">Country</label>
            <select id="shipping_country"  name="shipping_country">
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="shipping_phone">Phone</label>
            <input id="shipping_phone" type="text" name="shipping_phone" value={checkoutProps.shipping.phone} onChange={textChangeHandler} />
          </div>

          <h4>Billing Address</h4>

          <div className="form-group">
            <input type="radio" id="billing_use_shipping_true" name="billing_use_shipping" value="true" checked={checkoutProps.billing_use_shipping === true} onChange={billingUseShippingChangeHandler} />
            <label htmlFor="billing_use_shipping_true">Same as Shipping Address</label>

            <input type="radio" id="billing_use_shipping_false" name="billing_use_shipping" value="false" checked={checkoutProps.billing_use_shipping === false} onChange={billingUseShippingChangeHandler} />
            <label htmlFor="billing_use_shipping_false">Use a different billing address</label>
          </div>


          <div className="checkout-billing-fields" style={{display: (checkoutProps.billing_use_shipping ? "none" : "block")}}>
            <div className="form-group">
              <label htmlFor="billing_first_name">First Name</label>
              <input type="text" id="billing_first_name" name="billing_first_name" value={checkoutProps.billing.first_name} onChange={textChangeHandler} />
            </div>

            <div className="form-group">
              <label htmlFor="billing_last_name">Last Name</label>
              <input id="billing_last_name" type="text" name="billing_last_name" value={checkoutProps.billing.last_name} onChange={textChangeHandler} />
            </div>

            <div className="form-group">
              <label htmlFor="billing_address_1">Address 1</label>
              <input id="billing_address_1" type="text" name="billing_address1" value={checkoutProps.billing.address1} onChange={textChangeHandler} />
            </div>

            <div className="form-group">
              <label htmlFor="billing_address_2">Address 2</label>
              <input id="billing_address_2" type="text" name="billing_address2" value={checkoutProps.billing.address2} onChange={textChangeHandler} />
            </div>

            <div className="form-group">
              <label htmlFor="billing_city">City</label>
              <input id="billing_city" type="text" name="billing_city" value={checkoutProps.billing.city} onChange={textChangeHandler} />
            </div>


            <div className="form-group">
              <label htmlFor="billing_state">State</label>
              <select id="billing_state" name="billing_state">
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="billing_postal_code">ZIP Code</label>
              <input type="text" name="billing_postal_code" value={checkoutProps.billing.postal_code} onChange={textChangeHandler} />
            </div>

            <div className="form-group">
              <label htmlFor="billing_country">Country</label>
              <select id="billing_country" name="billing_country">
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="billing_phone">Phone</label>
              <input id="billing_phone" type="text" name="billing_phone" value={checkoutProps.billing.phone} onChange={textChangeHandler} />
            </div>
          </div>

          <h4>Credit Card</h4>
          <div className="form-group">
            <label htmlFor="cc_number">Credit Card Number</label>
            <input id="cc_number" type="text" name="cc_number" value={checkoutProps.cc_number} onChange={textChangeHandler} />
          </div>

          <div className="form-group">
            <label htmlFor="cc_exp_month">Exp Month</label>
            <select id="cc_exp_month" name="cc_exp_month" value={checkoutProps.cc_exp_month} onChange={textChangeHandler}>
              <CCMonthOptions />
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cc_exp_year">Exp Year</label>
            <select id="cc_exp_year" name="cc_exp_year" value={checkoutProps.cc_exp_year} onChange={textChangeHandler}>
              <CCYearOptions />
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cc_cvv">CVV</label>
            <input id="cc_cvv" type="text" name="cc_cvv" value={checkoutProps.cc_cvv} onChange={textChangeHandler} />
          </div>


          <div className="form-group">
            <input type="radio" id="combo_mode_credit" name="combo_mode" value="credit" checked={checkoutProps.combo_mode === "credit"} onChange={comboModeChangeHandler} />
            <label htmlFor="combo_mode_credit">Use Credit</label>

            <input type="radio" id="combo_mode_paypal" name="combo_mode" value="paypal" checked={checkoutProps.combo_mode === "paypal"} onChange={comboModeChangeHandler} />
            <label htmlFor="combo_mode_paypal">Use PayPal</label>

          </div>


          <div className="form-group">
            <label>Accepts Marketing?</label>
            <input type="checkbox" name="accepts_marketing" checked={checkoutProps.accepts_marketing} onChange={toggleChangeHandler} />
          </div>

          <div className="form-group">
            <label>Accepts Attentive?</label>
            <input type="checkbox" name="accepts_attentive" checked={checkoutProps.accepts_attentive} onChange={toggleChangeHandler} />
          </div>


          <button className="checkout-submit-combo" onClick={doPurchase}>Buy</button>

        </form>



    </>
  )
}
