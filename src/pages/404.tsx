const NotFoundPage: React.FC = () => {

    return (
      <div style={{ 
        color: '#167fff', 
        backgroundColor: 'white', 
        textAlign: 'center', 
        padding: '50px', 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center' 
      }}>
        <h1 style={{ fontSize: '3em', marginBottom: '20px' }}>404</h1>
        <p style={{ fontSize: '1.2em' }}>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
      </div>
    );

};

export default NotFoundPage;