export const paymentType_options = [
    { value: 'KBZ Pay', label: 'KBZ Pay', subOpts:[
        { value: 'QR', label: 'Pay with QR' },
        { value: 'PWA', label: 'Pay with KBZ Pay form' }
    ] },
    { value: 'AYA Pay', label: 'AYA Pay', subOpts:[
        { value: 'QR', label: 'Pay with QR' },
        { value: 'PIN', label: 'Pay with PIN' }
    ] },
    { value: 'CB Pay', label: 'CB Pay', subOpts:[
        { value: 'QR', label: 'Pay with QR' },
    ] },
    /* { value: 'Sai Sai Pay', label: 'Sai Sai Pay', subOpts:[
        { value: 'PIN', label: 'Pay with PIN' }
    ] }, */
    { value: 'WAVE PAY', label: 'WAVE PAY', subOpts:[
        { value: 'PIN', label: '(Wavemoney) -Pay with form' }
    ] },
    { value: 'Onepay', label: 'Onepay', subOpts:[
        { value: 'PIN', label: 'Pay with PIN' }
    ] },
    { value: 'MPitesan', label: 'MPitesan', subOpts:[
        { value: 'PIN', label: 'Pay with PIN' }
    ] },
    { value: 'KBZ Direct Pay', label: 'KBZ Direct Pay', subOpts:[
        { value: 'PWA', label: 'Pay with KBZ Bank Direct Pay' }
    ] },
    { value: 'MAB Bank', label: 'MAB Mobile Banking', subOpts:[
        { value: 'OTP', label: 'Pay with OTP' }
    ] },
    { value: 'MPU', label: 'MPU', subOpts:[
        { value: 'OTP', label: 'Pay with OTP' }
    ] },
    { value: 'Citizens', label: 'Citizens', subOpts:[
        { value: 'PIN', label: 'Pay with Citizens bank form' }
    ] },
    { value: 'Visa', label: 'Visa', subOpts:[
        { value: 'OTP', label: 'Pay with OTP' }
    ] },
    { value: 'JCB', label: 'JCB', subOpts:[
        { value: 'OTP', label: 'Pay with OTP' }
    ] },
    { value: 'Master', label: 'Master', subOpts:[
        { value: 'OTP', label: 'Pay with OTP' }
    ] }
];
