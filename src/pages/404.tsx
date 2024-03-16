const NotFoundPage: React.FC = () => {
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404 - Không tìm thấy trang</h1>
      <p style={{ fontSize: '1rem' }}>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
    </div>
  );
};

export default NotFoundPage;