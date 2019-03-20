import zaQuestion from './check-question'
import zaSex from './check-sex'
import zaYesno from './check-yesno'
import zaButton_group from './button_group'
import zaSinglecheck from './singlecheck'

export {
  zaSex,
  zaYesno,
  zaQuestion,
  zaButton_group,
  zaSinglecheck
}

export default {
  root: { },
  inline: {
    zaSex,
    zaYesno,
    zaButton_group,
    zaSinglecheck
  },
  block: {
    zaQuestion
  }
}
