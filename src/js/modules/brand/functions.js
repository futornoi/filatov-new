import $ from 'jquery'
import 'bootstrap/js/dist/modal'
import Modal from 'bootstrap/js/dist/modal'
import emailjs from 'emailjs-com'
import { serviceIdPB, templatePaymentIdPB, userIdPB } from './email'

let lastScrollTop = 0
const id = $('main').attr('id')

String.prototype.trunc = function (n) {
  return this.substr(0, n - 1) + (this.length > n ? '...' : '')
}

$(document).ready(function () {
  if (id !== 'main-page') {
    $('.header__link, .global-menu__link').each((index, link) => {
      const section = $(link).attr('href').split('#')[1]

      section && $(link).attr('href', `/${id.split('-page')[0]}.html#${section}`)
    })
  }

  $('.header__menu').on('click', function () {
    $('.global-menu').toggleClass('open')
    $('body').toggleClass('modal-open')
    $(this).toggleClass('is-opened')
  })

  $('.header-brand__menu').on('click', function () {
    $('.global-menu').toggleClass('open')
    $('body').toggleClass('modal-open')
    $(this).toggleClass('is-opened')
  })

  $('form').on('submit', function (e) {
    const form = $(this)
    const service = serviceIdPB
    const user = userIdPB
    const submitBtn = form.find('button[type=submit]')
    const templateId = templatePaymentIdPB
    e.preventDefault()

    submitBtn.attr('disabled', true)

    emailjs.sendForm(service, templateId, e.target, user).then(
      res => {
        if (res.status === 200) {
          const myModal = new Modal(form.parents('.modal'), {
            keyboard: false,
          })
          const successModal = new Modal(document.getElementById('success'), {
            keyboard: false,
          })
          submitBtn.attr('disabled', false)
          form.find('input, textarea').val('')
          myModal.hide()

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

  $('.global-menu__link').on('click', function (e) {
    e.preventDefault()
    const href = $(this).attr('href')

    $('body').removeClass('modal-open')
    $('.global-menu').removeClass('open')
    $('.header__menu').removeClass('is-opened')
    $('.header-brand__menu').removeClass('is-opened')

    if (href.includes('#')) {
      $('html, body').animate(
        {
          scrollTop: $(`#${$(this).attr('href').split('#')[1]}`).offset().top - 31,
        },
        500,
      )
    } else {
      window.location.href = href
    }
  })

  $('.section-title').each((index, title) => {
    const text = $(title).attr('data-word')?.split(' ')
    const previewText = $(title).attr('data-word-preview')?.split(' ')

    text
      ?.filter(word => word !== '' && word !== '<br>' && word)
      .forEach((word, i) => {
        $(title).append(
          `<span><span data-aos="fade-up-mask" data-aos-delay="${i * 150}">${word}</span></span>`,
        )
      })

    previewText
      ?.filter(word => word !== '' && word !== '<br>' && word)
      .forEach((word, i) => {
        $(title).append(
          `<span><span data-aos="fade-up-mask" data-aos-delay="${
            6100 + i * 50
          }">${word}</span></span>`,
        )
      })
  })

  $('#reservation-form').on('hidden.bs.modal', function () {
    $(this).find('input[type=hidden]').val('')
  })

  $('[data-value]').on('click', function () {
    const value = $(this).attr('data-value')
    const form = $(this).attr('data-form')

    $(`${form}`).find('input[type=hidden]').val(value)
  })
})

$(window).on('scroll', function () {
  let st = window.pageYOffset || document.documentElement.scrollTop

  if (st > lastScrollTop) {
    $('header').addClass('active')
  }

  if (st <= 0) {
    $('header').removeClass('active')
  }

  lastScrollTop = st <= 0 ? 0 : st
})
