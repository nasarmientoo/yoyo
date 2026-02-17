<script setup lang="js">
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { ref } from 'vue';
import { useSeoMeta } from '#app'

const formSubmitted = ref(false)
const fullname = ref('')
const email = ref('')
const message = ref('')
const status = ref(
    'Your message has found its way to us.\n' +
    'Thank you for sharing your energy —\n' +
    'we\'ll respond with care.'
)

// Function to submit contact form to Supabase 'requests' table
async function submitForm() {
  try {
    const { data, error } = await useFetch('/api/contact/insertNewRequest', {
      method: 'POST',
      body: {
        fullname: fullname.value,
        email: email.value,
        message: message.value,
      }
    })

    if (error.value || data.value?.success === false) {
      console.error('Form submission failed:', error.value || data.value?.error)
      status.value = 'Some error interrupted your flow of energy —\n try again later.'
    } else {
      status.value = 'Your message has found its way to us.\n' +
          'Thank you for sharing your energy —\n' +
          'we\'ll respond with care.'
    }

  } catch (error) {
    console.error('Unexpected error:', error)
    status.value = 'Some error interrupted your flow of energy —\n try again later.'
  }

  formSubmitted.value = true;
}

// Reset the form state
function changeState() {
  formSubmitted.value = false
  message.value = ''
  status.value = 'Your message has found its way to us.\n' +
      'Thank you for sharing your energy —\n' +
      'we\'ll respond with care.'
}

// SEO metadata
useSeoMeta({
  title: "Contact Us",
  description: "In this page user can send messages directly to YoYo House.",
})
</script>


<template>

  <Navbar></Navbar>

  <div class="contact-body">

    <div class="contact-text">

      <h1 class="title">Contact us</h1>
      <p class="plain-text">We’d love to hear from you! Whether you have a question about classes, memberships, private sessions, or just want to say hello — we’re here for you.</p>

      <div class="form-container" v-if="!formSubmitted">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="fullname">Fullname <span class="required">*</span></label>
            <input type="text" v-model="fullname" name="fullname" id="fullname" required />
          </div>

          <div class="form-group">
            <label for="email">Email <span class="required">*</span></label>
            <input type="email" v-model="email" name="email" id="email" required />
          </div>

          <div class="form-group">
            <label for="message">Message <span class="required">*</span></label>
            <textarea v-model="message" name="message" rows="4" id="message" required></textarea>
          </div>

          <div class="submit-container">
            <button class="clickable-button" type="submit">Submit</button>
          </div>
        </form>
      </div>

      <div class="message-container" v-if="formSubmitted">
        <p class="thank-you-text">
          {{status}}
        </p>

        <button class="clickable-button" @click="changeState()">Need more clarity?</button>
      </div>

      <div class="contacts">
        <h2 class="phone plain-text">
          📞 <b>Phone</b> <br>
          +39 02 12345678 <br>
          Mon–Sun, <br>
          9:00 AM – 19:00 PM
        </h2>

        <h2 class="address plain-text">
          📍 <b>Address</b> <br>
          YoYo House, <br>
          via Paladini 32 <br>
          Milano, 20134, Italy
        </h2>

        <h2 class="mail plain-text">
          📧 <b>Email</b> <br>
          hello@YoYohouse.it
        </h2>
      </div>

    </div>

    <div class="contact-image-container">
      <img class="contact-image" src="/assets/images/contact-us.png" alt="Contact Us">
    </div>

  </div>

  <Footer></Footer>

</template>

<style scoped>

  .contact-body {
    min-height: 88vh;
    display: grid;
    grid-template-columns: 1.12fr 0.88fr;
    background-color: #F2E6E6;
    padding: 15px 0 50px 0;
  }

  .contact-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
    gap: 35px;
    padding: 0 75px 0 75px;
  }

  .contact-image-container{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-right: 30px;
  }

  .contact-image {
    width: 100%;
    max-width: 605px;
    max-height: 1016px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    border-radius: 30px;
  }

  .title{
    position: relative;
    top: 10px;
    color: var(--Black);
    text-align: center;
    font-size: var(--font-small-title);
    font-style: normal;
    font-weight: 700;
  }

  .plain-text{
    color: #000;
    font-size: var(--font-text);
    font-style: normal;
    font-weight: 400;
    line-height: 30px;
    max-width: 701px;
  }


  .form-container {
    border: 1px solid #c5a4d6;
    padding: 20px 30px;
    width: 90%;
    max-width: 500px;
    margin: 50px auto;
    box-sizing: border-box;
  }

  .form-group {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  label {
    flex: 1;
    font-size: var(--font-medium-text);
    font-weight: bold;
  }

  .required {
    color: #8C0404;
    margin-left: 5px;
  }

  input[type="text"],
  input[type="email"],
  textarea {
    flex: 2;
    padding: 10px;
    border: none;
    background-color: white;
    box-sizing: border-box;
    font-size: var(--font-medium-text);
  }

  textarea {
    resize: none;
  }

  .submit-container {
    text-align: center;
    margin-top: 20px;
  }

  .message-container {
    text-align: center;
    padding: 100px 20px;
  }

  .thank-you-text {
    color: #000;
    font-size: var(--font-big-text);
    font-style: italic;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 60px;
    white-space: pre-line;
  }

  .clickable-button {
    max-width: 310px;
    width: 100%;
    height: 55px;
    flex-shrink: 0;
    background-color: #0d0d39;
    color: #FFFFFF;
    border-radius: 6px;
    border: 0;

    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    transition: background-color 0.3s ease;
  }

  .clickable-button:hover {
    background-color: #060620;
  }

  .clickable-button:active {
    background-color: #060620;
  }

  .contacts{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  .phone{
    width: 229px;
  }

  .address{
    width: 223px;
  }

  .mail{
    width: 237px;
  }

  @media (max-width: 1100px) {

    .contact-body{
      grid-template-columns: 1fr;
    }

    .contact-text {
      width: 90%;
      padding: 0;
      margin-left: auto;
      margin-right: auto;
    }

    .contact-image-container{
      display: none;
    }

    .contacts{
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    .form-group {
      flex-direction: column;
      align-items: stretch;
    }

    label {
      margin-bottom: 5px;
    }
  }

</style>