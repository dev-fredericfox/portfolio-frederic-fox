<template>
  <div class="content">
    <div class="columns">
      <div class="column is-2"></div>
      <div class="column is-8 has-text-centered">
        <h1 class="title is-5">Get in touch</h1>
        <p><b>Have a project in mind? Send me your ideas, and I’ll get back to you shortly!</b></p>
      </div>
    </div>
    <div class="columns mt-5 mb-5 p-5">
      <div class="column is-3"></div>
      <div class="column has-text-centered is-6 pt-5 mt-5 mb-5">
        <div v-if="!success">
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <div class="control is-expanded">
                  <input
                    class="input"
                    type="text"
                    v-model="firstName"
                    autocomplete="given-name"
                    :disabled="sending"
                    required
                  />
                  <label class="label">First Name</label>
                </div>
              </div>
              <div class="field">
                <div class="control is-expanded">
                  <input
                    class="input"
                    type="text"
                    v-model="lastName"
                    autocomplete="family-name"
                    :disabled="sending"
                    required
                  />
                  <label class="label">Last Name</label>
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input
                :class="['input', { 'is-invalid': !emailV && email != '' }]"
                type="text"
                name="email"
                v-model="email"
                autocomplete="email"
                :disabled="sending"
                required
              />
              <label class="label">Email</label>
            </div>
            <p v-if="!emailV && email != ''" class="help is-danger">
              This email is invalid
            </p>
          </div>

          <div class="field">
            <div class="control">
              <textarea
                class="textarea"
                v-model="message"
                autocomplete="off"
                :disabled="sending"
                required
              ></textarea>
              <label class="label">Message</label>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input v-model="privacyV" type="checkbox" :disabled="sending" />
                I have read and agree to the <a href="/privacy">Privacy Policy</a>
              </label>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button
                :class="['button', 'is-link', { 'is-loading': sending }]"
                @click="postForm"
                :disabled="sendDisabled"
              >
                Send Message
              </button>
              <p class="mt-5" v-if="error">Oh no, our form, it's broken! <br>Something went wrong. Please try again, if the problem persists contact the system admin.</p>
            </div>
          </div>
        </div>
        <div v-if="success">
          <p>Your message has been sent!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onUpdated } from 'vue';

export default {
  setup() {
    const state = reactive({
      count: 0,
    });
    const formData = reactive({
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    });
    const formValidation = reactive({
      firstNameV: false,
      lastNameV: false,
      emailV: false,
      messageV: false,
      privacyV: false,
    });
    const button = reactive({
      sendDisabled: true,
    });

    // Computed Values Form Validation
    const validateForm = () => {
      const emailRegex =
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      formData.firstName != ''
        ? (formValidation.firstNameV = true)
        : (formValidation.firstNameV = false);
      formData.lastName != ''
        ? (formValidation.lastNameV = true)
        : (formValidation.lastNameV = false);
      formData.message != ''
        ? (formValidation.messageV = true)
        : (formValidation.messageV = false);
      emailRegex.test(formData.email)
        ? (formValidation.emailV = true)
        : (formValidation.emailV = false);
    };

    const enableButton = () => {
      Object.values(formValidation).every(Boolean)
        ? (button.sendDisabled = false)
        : (button.sendDisabled = true);
    };

    // Lifecycle Hooks Form Validation
    onUpdated(() => {
      validateForm();
      enableButton();
    });

    // Form Sending State
    const formStatus = reactive({
      disabled: false,
      sending: false,
      error: false,
      success: false,
    });
    // Functions Form Submission
    const postForm = async () => {
      formStatus.sending = true;
      formStatus.error = false;
      const postReqSettings = {
        method: 'POST',
        mode: 'cors',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname: formData.firstName,
          lname: formData.lastName,
          email: formData.email,
          message: formData.message,
        }),
      };
      try {
        console.log(postReqSettings);
        const response = await fetch(
          'https://us-central1-form-forwarder-v1.cloudfunctions.net/app/fredericportfolio',
          postReqSettings
        );
        console.dir(response);
        console.dir(response.body);
        if (response.status == 200) {
          formStatus.success = true;
        } else {
          throw 'Form sending failed';
        }
      } catch (error) {
        formStatus.disabled = false;
        formStatus.sending = false;
        formStatus.error = true;
        console.log('Post failed. Reason: ' + error);
      }
    };

    return {
      ...toRefs(state),
      ...toRefs(formData),
      ...toRefs(formValidation),
      ...toRefs(button),
      ...toRefs(formStatus),
      postForm,
    };
  },
};
</script>

<style lang="scss" scoped>
input,
textarea {
  background: transparent;
  border-radius: 0;
  color: hsla(233, 18%, 72%);
  border: none;
  border-bottom: 1px solid hsla(233, 18%, 72%);
  padding: 5px 10px;
  margin-bottom: 20px;
  outline: none;
  &:focus {
    border-color: #fff;
    color: #fff;
    box-shadow: none;
  }
  &:not(:focus):valid {
    border-color: hsla(171, 70%, 51%);
  }
  &:focus + label {
    transform: scale(0.6);
    top: -15px;
    left: -15px;
  }
  &:not(:focus):valid + label {
    transform: scale(0.6);
    top: -15px;
    left: -15px;
  }
  &:disabled {
    background-color: rgba(255, 255, 255, 0.05);
    color: transparent;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }
  &:disabled + label {
    transform: scale(0.6);
    top: -15px;
    left: -15px;
  }
  &:-webkit-autofill:focus {
    background-clip: text;
    -webkit-text-fill-color: #fff !important;
  }
  &:-webkit-autofill {
    background-clip: text;
    -webkit-text-fill-color: hsla(233, 18%, 72%) !important;
  }
}

.label {
  position: absolute;
  pointer-events: none;
  width: 100px;
  top: 8px;
  left: 0;
  transition: 0.2s ease all;
  text-align: left;
}

.input.is-invalid {
  border-color: red !important;
}

.textarea {
  height: 20vh;
}

// Overide Bulma button default
.field.is-grouped {
  justify-content: center;
}

.content {
  margin-bottom: 4rem;
}

.checkbox:hover {
    color: hsla(255, 100%, 100%);
}
</style>
