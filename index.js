/*
* @Author: jankergg
* @Date:   2018-01-23 17:24:29
* @Last Modified by:   jankergg
* @Last Modified time: 2018-06-25 12:32:02
*/
import Components from './src/components'
import baseMixin from './src/components/form-fields/mixin/base-mixin'
import AlertPlugin from './src/plugins/alert/index.js'
import ConfirmPlugin from './src/plugins/confirm/index.js'
import ToastPlugin from './src/plugins/toast/index.js'
import LoadingPlugin from './src/plugins/loading/index.js'
import {actionsheet, Tab, TabItem,TabAdv,TabItemAdv, checker, checkerItem, checkList, PopupPicker} from './src/components/vux'
import TransferDom from './src/directives/transfer-dom'
const {
  // formUnit
  formUnit,
  // form fields src/components/form-fields/check
  zaTitle,
  zaText,
  zaSex,
  zaSinglecheck,
  zaYesno,
  zaButton_group,
  zaQuestion,

  // src/components/form-fields/input
  zaInput,
  zaInputBtn,
  zaInputTxt,
  zaInputCamera,
  zaTextarea,

  // src/components/form-fields/select
  zaSelect,
  zaDate,
  zaAddress,
  zaAddressFull,

  row1Col,
  row2Col,
  row3Col
} = Components

export {
  // from vux
  TransferDom,
  actionsheet,
  LoadingPlugin,
  Tab,
  TabItem,
  TabAdv,
  TabItemAdv,
  AlertPlugin,
  ConfirmPlugin,
  ToastPlugin,
  checker,
  checkerItem,
  checkList,
  PopupPicker,

  // components
  baseMixin,
  formUnit,
  zaTitle,
  zaText,
  zaSex,
  zaSinglecheck,
  zaYesno,
  zaButton_group,
  zaQuestion,
  zaInput,
  zaInputBtn,
  zaInputTxt,
  zaInputCamera,
  zaTextarea,
  zaSelect,
  zaDate,
  zaAddress,
  zaAddressFull,
  row1Col,
  row2Col,
  row3Col
}
