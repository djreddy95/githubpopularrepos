// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {fetchedDetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = fetchedDetails

  return (
    <li className="list-items-container">
      <img src={avatarUrl} alt={name} className="avatar" />
      <h1 className="name-heading">{name}</h1>
      <div className="responsive-container">
        <div className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="stars imageUrl"
          />
          <p className="stars-count">{starsCount} stars</p>
        </div>
        <div className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="forks imageUrl"
          />
          <p className="forks-count">{forksCount} forks</p>
        </div>
        <div className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="issues imageUrl"
          />
          <p className="issues-count">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem