require('bootstrap/js/dist/collapse')

const id = document.getElementsByTagName('main')[0].getAttribute('id')

switch (id) {
  case 'main-page':
    require('./modules/index')
    break
  case 'new-smm':
		require('./modules/pageHeight')
		require('./modules/new-smm/header')
		require('./modules/new-smm/main')
	case 'personal-brand-page':
		require('./modules/brand/functions')
    require('./modules/brand/main')
}