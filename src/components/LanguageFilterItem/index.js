// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachDataDetails, isActive, setActiveFilteredId} = props
  const {language, id} = eachDataDetails
  const activeClassName = isActive ? 'active-tab active-tab-id' : 'active-tab'

  const onClickTabId = () => {
    setActiveFilteredId(id)
  }

  return (
    <li className="list-items">
      <button type="button" className={activeClassName} onClick={onClickTabId}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
