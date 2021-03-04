class SettingsPopUp extends HTMLElement {
    closePopUp() {
        const wrapper = this.shadowRoot.getElementById('settings-confirm-popup');
        wrapper.style.display = 'none';
    }

    confirmSettings() {
        const pomoLength = this.shadowRoot.getElementById('pomo-length-input').value;
        const shortBreak = this.shadowRoot.getElementById('short-break-input').value;
        const longBreak = this.shadowRoot.getElementById('long-break-input').value;
        localStorage.setItem('pomo-length', pomoLength);
        localStorage.setItem('short-break-length', shortBreak);
        localStorage.setItem('long-break-length', longBreak);
        // stop();
        this.closePopUp();
    }

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        // use div as wrapper
        const wrapper = document.createElement('div');
        wrapper.setAttribute('id', 'settings-confirm-popup');
        const title = wrapper.appendChild(document.createElement('h3'));
        title.innerHTML = 'Settings';
        // append input forms
        const pomoInput = wrapper.appendChild(document.createElement('input'));
        pomoInput.setAttribute('type', 'number'); // TODO: handle negatives
        pomoInput.setAttribute('id', 'pomo-length-input');
        pomoInput.setAttribute('value', parseInt(localStorage.getItem('pomo-length')));
        pomoInput.setAttribute('min', 1); // values subj. to change
        pomoInput.setAttribute('max', 60); // values subj. to change
        const shortBreakInput = wrapper.appendChild(document.createElement('input'));
        shortBreakInput.setAttribute('type', 'number'); // TODO: handle negatives
        shortBreakInput.setAttribute('id', 'short-break-input');
        shortBreakInput.setAttribute('value', parseInt(localStorage.getItem('short-break-length')));
        shortBreakInput.setAttribute('min', 1); // values subj. to change
        shortBreakInput.setAttribute('max', 60); // values subj. to change
        const longBreakInput = wrapper.appendChild(document.createElement('input'));
        longBreakInput.setAttribute('type', 'number'); // TODO: handle negatives
        longBreakInput.setAttribute('id', 'long-break-input');
        longBreakInput.setAttribute('value', parseInt(localStorage.getItem('long-break-length')));
        longBreakInput.setAttribute('min', 1); // values subj. to change
        longBreakInput.setAttribute('max', 60); // values subj. to change
        // append confirm and cancel buttons
        const confirmBtn = wrapper.appendChild(document.createElement('button'));
        confirmBtn.setAttribute('class', 'settings-popup-btns');
        confirmBtn.setAttribute('id', 'confirm-settings-btn');
        confirmBtn.innerHTML = 'Confirm';
        const cancelBtn = wrapper.appendChild(document.createElement('button'));
        cancelBtn.setAttribute('class', 'settings-popup-btns');
        cancelBtn.setAttribute('id', 'cancel-settings-btn');
        cancelBtn.innerHTML = 'Cancel';
        // event listeners
        // keyboard access for confirm/close btn
        window.addEventListener('keydown', (event) => {
            const btnSound = new Audio('../icons/btnClick.mp3');
            if (event.code === 'Enter' && wrapper.style.display !== 'none') {
                confirmBtn.click();
                btnSound.play();
            }
            if (event.code === 'Escape' && wrapper.style.display !== 'none') {
                cancelBtn.click();
                btnSound.play();
            }
        });
        confirmBtn.addEventListener('click', this.confirmSettings.bind(this));
        cancelBtn.addEventListener('click', this.closePopUp.bind(this));

        const style = document.createElement('style');
        style.textContent = `
        #settings-confirm-popup {
            display: none;
            position: fixed;
            width: 30%;
            height: 30%;
            border-radius: 4px;
            top:25%;
            left: 34%;
            border: 3px solid #f1f1f1;
            z-index: 1;
            background-color: whitesmoke;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
            -webkit-animation-name: animatetop; 
            -webkit-animation-duration: 0.3s;
            animation-name: animatetop;
            animation-duration: 0.3s
          }
          @-webkit-keyframes animatetop {
            from {top:-200px; opacity:0} 
            to {top:70; opacity:1}
          }
          @keyframes animatetop {
            from {top:-200px; opacity:0}
            to {top:70; opacity:1}
          }
          #settings-confirm-popup > h3{
            font-size: 1.6vw;
            color: #f36060;
            border-bottom: solid 1px #d2d2d2;
            padding-bottom: 5px;
            width: 85%;
            margin: 20px auto 10px auto;
        }`;
        shadow.appendChild(wrapper);
        shadow.appendChild(style);
    }
}
customElements.define('settings-popup', SettingsPopUp);

window.addEventListener('load', () => {
    const settingsButton = document.getElementById('setting-button');
    const settingsPopUp = document.createElement('settings-popup');
    document.body.appendChild(settingsPopUp);
    settingsButton.addEventListener('click', () => {
        let btnSound = new Audio('../icons/btnClick.mp3');
        btnSound.play();
        settingsPopUp.shadowRoot.getElementById('settings-confirm-popup').setAttribute('style', 'display:block');
    });
});

module.exports = SettingsPopUp;
