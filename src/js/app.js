require('bootstrap/js/dist/collapse')
import AOS from './libs/aos'
import aosConfig from './modules/aosConfig'
import Modal from 'bootstrap/js/dist/modal'
import emailjs from 'emailjs-com'
import $ from 'jquery'
import { serviceId, templatePaymentIdPB, userId, templatePaymentIdNS } from './modules/email'

const id = document.getElementsByTagName('main')[0].getAttribute('id')

$(document).ready(function () {
  AOS.init(aosConfig)

	const brandModal = new Modal(document.getElementById('reservation-brand'), {
		keyboard: false,
	})
	const successModal = new Modal(document.getElementById('success'), {
		keyboard: false,
	})

  $('form').on('submit', function (e) {
    const form = $(this)
    const id = form.attr('id')
    const service = serviceId
    const user = userId
    const submitBtn = form.find('button[type=submit]')
    const templateId = id === 'reservation-brand-form' ? templatePaymentIdPB : templatePaymentIdNS
    e.preventDefault()

    submitBtn.attr('disabled', true)

    emailjs.sendForm(service, templateId, e.target, user).then(
      res => {
        if (res.status === 200) {
          submitBtn.attr('disabled', false)
          form.find('input, textarea').val('')

          if (id === 'reservation-brand-form') {
            brandModal.hide()
          } else {
            $(`[data-modal=reserve]`).removeClass('active')
          }
          setTimeout(function () {
            successModal.show()
          }, 500)
        }
      },
      err => {
        if (err) {
          submitBtn.attr('disabled', false)
          form.append(
            `<small class="form-error">Ошибка при отправке заявки! Попробуйте позже</small>`,
          )

          setTimeout(function () {
            form.find('small').remove()
          }, 2500)
        }
      },
    )
  })
})

switch (id) {
  case 'main-page':
    require('./modules/index')
    break
  case 'new-smm':
    require('./modules/pageHeight')
    require('./modules/new-smm/header')
    require('./modules/new-smm/main')
    break
  case 'personal-brand-page':
    require('./modules/brand/functions')
    require('./modules/brand/main')
    break
}
