import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';

const STRIPE_PK =
    'pk_live_51I5xsZHfpGzqPMuxHqecfHvFjzKLLYE9GKWrtDufVmLyXLdgzvMaIgMBpb4Xrs6YvitIu86jjQpYNxSmNUcle3dw00szaUE6QI';
const STRIPE_PK_test =
    'pk_test_51JzGFSIQ5jtZj5qxHaxY2wnpVnLQZ54GXkq4U0vIYyJuYApQzOugmA5VmkFSzbz7xxWiRs9WUlg8ZhLfi1LZyvYt00H7PioqkR';

const PaymentView = props => {


    const runFirst = `
    window.isNativeApp = true;
  `;
    const { amount } = props;
    const onCheckStatus = response => {

        console.log("Hello Calleddd", props.onCheckStatus(response))
        props.onCheckStatus(response);
    };


    const htmlContent = `
                <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Payment Page</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                <link rel="preconnect" href="https://fonts.gstatic.com">
                <script src="https://js.stripe.com/v3/"></script>

                <style>
                ::-webkit-input-placeholder { /* Edge */
                color: white;
                }

                :-ms-input-placeholder { /* Internet Explorer */
                color: white;
                }

                ::placeholder {
                color: white;
                }

                body{
                    position:absolute;
                    left:0px;
                    right:0px;
                    top:0px;
                }
                .membership-container{
                     display:flex;
                     flex-direction: column;
                     align-items: center;
                     margin-top:20px;

                }
                .center{
                    display:flex;
                    justify-content: center;
                     align-items: center;
                     
                }
                .card{
                    background-color: #11005D;
                    border-radius: 10px !important;
                    margin-top:50px;
                    
                }
                .card-holder{
                    display: flex;
                    flex-direction: column;
                    height: 150px;
                    justify-content: space-around;
                    background-color: #11005D;
                    border-radius: 20px;
                    padding: 10px;
                    padding-top: 20px;
                    padding-bottom: 20px;
                    margin-top: 50px;
                    margin-bottom: 50px;

                }
                .card-element{
                    height: 100px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                }
                .card-name{
                    padding: 20;
                    color: '#FFF';
                    font-weight: 500;
                    font-size: '25px';
                    background-color: transparent;
                    border: none;

                }
                input {
                    outline:none;
                    color: #FFF;
                    font-size: '25px';
                    font-weight: 500;
                    background-color: transparent;
                    }
                    .row{
                        margin-top: '50px';
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                    }

                    .products-info{
                        width: 100%;
                        padding: 20px;
                        text-align: center;
                        color:#11005D;
                        text-transform: uppercase;

                    }

                    .card-errors{
                        color: red;
                    }
                    .pay-btn{
                        display: flex;
                        height: 50px;
                        justify-content: center;
                        align-items: center;
                        
                        margin: 30px;
                    }
                .custom-btn{
                    background-color:#E32B2B;
                    color:#FFFFFF !important;
                    box-shadow: none !important;
                    border-radius: 50px !important;
    outline: none !important;
                }
               

                </style>

            </head>
            <body>

                <!-- product info -->
                <div class="container-fluid">
                    


                        <form>
                        <div class="card" >
                            <div class="card-holder">
                                    <input type="text" placeholder="Card Holder Name" id="card-name" class="card-name" />

                                    <div id="card-element" class="card-element">

                                        <div class="form-row">
                                            <label>
                                                <span >Card number</span>
                                                <input type="text" size="20" data-stripe="number">
                                            </label>
                                        </div>

                                        <div class="form-row">
                                        <label>
                                            <span>Expiration (MM/YY)</span>
                                            <input type="text" size="2" data-stripe="exp_month">
                                        </label>
                                        <span> / </span>
                                        <input type="text" size="2" data-stripe="exp_year">
                                        </div>

                                        <div class="form-row">
                                        <label>
                                            <span>CVC</span>
                                            <input type="text" size="4" data-stripe="cvc">
                                        </label>
                                        </div>

                                    </div>

                                </div>

                            </div>
                            <div class="row">
                        <label class="card-errors" id="card-errors"></label>
                    </div>
                                <div class="pay-btn">
                                    <input type="submit" class="btn btn-lg btn-block custom-btn" value="Pay Now" />
                                </div>

                        </form>
                    
                <script>
                    var stripe = Stripe('${STRIPE_PK_test}');

                    var elements = stripe.elements();

                        var card = elements.create("card", {
                            hidePostalCode: true,
                            style: {
                                base: {
                                color: '#FFF',
                                fontWeight: 500,
                                fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
                                fontSize: '20px',
                                fontSmoothing: 'antialiased',
                                '::placeholder': {
                                    color: '#FFFFFF',
                                },
                                ':-webkit-autofill': {
                                    color: '#e39f48',
                                },
                            },
                            invalid: {
                                color: '#FC011F',
                                '::placeholder': {
                                    color: 'red',
                                },
                            },
                            }
                        });

                        
                        card.mount('#card-element');

                        /**
                         * Error Handling
                         */

                        
                        function showCardError(error){
                            document.getElementById('card-errors').innerHTML = ""
                            if(error){
                                document.getElementById('card-errors').innerHTML = error
                            }
                        }

                        card.on('change', function(event) {
                            if (event.complete) {
                                showCardError()
                                
                            } else if (event.error) {
                                const { message} = event.error
                                
                                showCardError(message)
                            }
                        });

                        card.mount('#card-element');

                        /**
                         * Payment Request Element
                         */
                        var paymentRequest = stripe.paymentRequest({
                            country: "IN",
                            currency: "inr",
                            total: {
                                amount: ${amount * 100},
                                label: "Total"
                            }
                        });

                        var form =  document.querySelector('form');

                        form.addEventListener('submit', function(e) {
                            e.preventDefault();

                            var additionalData = {
                                name: document.getElementById('card-name').value,
                                address_line1: undefined,
                                address_city:  undefined,
                                address_state: undefined,
                                address_zip: undefined,
                            };

                            stripe.createToken(card, additionalData).then(function(result) {

                            

                            if (result.token) {
                                window.postMessage(JSON.stringify(result));
                            } else {
                                window.postMessage(JSON.stringify(result));
                            }
                        });

                        })

                </script>

            </body>
            </html>

    `;

    //find a postMessage to talk to hoster

    const injectedJavaScript = `(function() {
        window.postMessage = function(data){
            window.ReactNativeWebView.postMessage(data)
        };
    })()`

  


    const onMessage = (event:any) => {

        const { data } = event.nativeEvent;

        onCheckStatus(data);
    };
    

    return (
        <WebView
            javaScriptEnabled={true}
            style={{ flex: 1 }}
            originWhitelist={["*"]}
            source={{
                html: htmlContent,
                baseUrl: 'https://intechsol-developer.co/aduane',
            }}
            injectedJavaScriptBeforeContentLoaded={runFirst}
            domStorageEnabled={true}
            scalesPageToFit={true}
            scrollEnabled={false}
            injectedJavaScript={injectedJavaScript}
            onNavigationStateChange={(e) => {
                console.log("Serererr-----", e)
            }}

           
            automaticallyAdjustContentInsets={true}
            onError={(e) => {
                console.log('error occured', e)
            }}
            // onMessage={ e => { console.log(e) } }
            onMessage={onMessage}
        />
    );
};

export default PaymentView;
