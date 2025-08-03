import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-primary-700 mb-6 text-center">Giới Thiệu Về MSneaker</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          MSneaker là cửa hàng chuyên cung cấp các sản phẩm giày thể thao chính hãng, đa dạng mẫu mã từ các thương hiệu nổi tiếng như Nike, Adidas, Vans, Converse... Chúng tôi cam kết mang đến cho khách hàng trải nghiệm mua sắm hiện đại, dịch vụ tận tâm và sản phẩm chất lượng nhất.
        </p>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-primary-600 mb-2">Sứ mệnh của chúng tôi</h2>
          <p className="text-gray-600">
            MSneaker mong muốn trở thành điểm đến tin cậy cho cộng đồng yêu giày thể thao tại Việt Nam, luôn cập nhật xu hướng mới nhất và mang lại giá trị thực cho khách hàng.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-primary-600 mb-2">Giá trị cốt lõi</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Chính hãng 100%, bảo hành uy tín</li>
            <li>Đội ngũ tư vấn nhiệt tình, chuyên nghiệp</li>
            <li>Đổi trả linh hoạt, giao hàng toàn quốc</li>
            <li>Luôn đặt khách hàng làm trung tâm</li>
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-primary-600 mb-2">Thông tin liên hệ</h2>
          <p className="text-gray-600">
            Địa chỉ: An Khánh - Hoài Đức - Hà Nội<br />
            Hotline: 0968399602<br />
            Email: support@msneaker.vn
          </p>
        </div>
        <div className="text-center mt-10">
          <img src="https://bizweb.dktcdn.net/100/413/756/collections/jordan-2.jpg?v=1617462460240" alt="MSneaker Store" className="mx-auto rounded-lg shadow-lg max-h-72 object-cover" />
        </div>
      </div>
    </section>
  );
};

export default About;
