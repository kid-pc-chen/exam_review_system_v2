/*
  * Redux概念筆記
  - Reducer: reducer的工作就是在決定當action發生時，應用程式的state該如何去做改變
  - Dispatcher:
      * Redux沒有Flux中dispatcher的概念
      * 取而代之，將action分派的工作交由store來做
      * 因此，我們可以在component中直接呼叫store的dispatch方法，來將action分派給store
  - Redux的應用程式只用一個store，並將所有states儲存在一個物件中。
      * 如果想要把資料邏輯拆分時，可以設計多個reducers，並將它們組合(combineReducers)起來，
        而不是使用多個stores。
*/

import { createStore } from 'redux'
import onUserChange from '../reducers/examReducers'

let store = createStore(onUserChange)

export default store
