##React-crossfade

React.js-компонент, который позволяет легко анимировать замещение одного DOM-элемента другим.

> Использует `ReactCSSTransitionGroup`, но запускает появление *следующего* элемента только после полного исчезновения *предыдущего*

[![Image](http://static.mvanikanov.ru/tYIBuc9RHD.gif?raw=true)](http://mvanikanov.ru/react-crossfade/)

##Installation

```
$ npm install react-crossfade -save
```

##Usage

```
<Crossfade transitionName="example" transitionLeaveTimeout={400} transitionEnterTimeout={400}>
	{this.state.isElementSwitched ? 
		<div className="element" key={1}>B</div>
		:
		<div className="element" key={0}>A</div>
	}
</Crossfade>
```
###Params
- `transitionName` - названия namespace'a для CSS классов
- `transitionLeaveTimeout` - длительность анимации исчезновения старого DOM-элемента
- `transitionEnterTimeout` - длительность анимации появления нового DOM-элемента (начнется только после окончания transitionLeaveTimeout)

> Содержимым компонента должен являться один DOM-элемент или `null`  
> Анимация сработает, если у элементов будут разные параметры `key`, иначе замещение анимироваться не будет

###CSS

В CSS необходимо описать анимацию, использую `transitionName` в названиях классов

```
.example-enter {
	opacity: 0;
}

.example-enter.example-enter-active {
	transition: opacity 400ms ease;
	opacity: 1;
}

.example-leave {
	opacity: 1;
}

.example-leave.example-leave-active {
	transition: opacity 400ms ease;
	opacity: 0;
}
```

##Demo

[mvanikanov.ru/react-crossfade/](http://mvanikanov.ru/react-crossfade/)

####Для запуска примера:

- `$ git clone https://github.com/m-anikanov/react-crossfade.git`
- открыть example/index.html

####Для запуска сборки:
`$ npm install`
- `$ npm run example` - запустить сборку example c флагом watch
- `$ npm run build` - пересобрать react-crossfade


##License

MIT