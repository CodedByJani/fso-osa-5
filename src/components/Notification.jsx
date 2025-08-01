const Notification = ({ message }) => {
  if (message === null) return null

  return (
    <div style={{
      color: 'white',
      background: 'gray',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5
    }}>
      {message}
    </div>
  )
}

export default Notification
