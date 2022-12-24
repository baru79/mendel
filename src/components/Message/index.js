const Message = ({ message, color = 'black' }) => (
  <h2 style={{ color, textAlign: 'center' }}>{message}</h2>
);

export default Message;
