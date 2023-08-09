// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageItem, changeId} = props
  const {id, language} = languageItem

  const onClickChange = () => {
    changeId(id)
  }

  return (
    <li>
      <button type="button" className="btn" onClick={onClickChange}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
