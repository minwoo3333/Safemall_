class NoticeService{
    constructor() {
        // HTTP 클라이언트 설정 및 기본 URL 설정
        this.baseUrl = 'http://localhost:8080';
        this.headers = {
          'Content-Type': 'application/json',
          // 필요에 따라 인증 헤더나 기타 헤더 추가 가능
        };
      }

      // 공지 리스트 불러오기
      async getNoticeList(lastId) {
        // 마지막 게시글 id를 보내고, 최초 한번은 빈값을 보낸다
        const queryParams = lastId ? `?lastId=${lastId}` : '';
        const response = await fetch(`${this.baseUrl}/notice${queryParams}`, {
          method: 'GET',
          headers: this.headers,
        });
        const responseData = await response.json();
        const data = responseData.data; 
      
        return data;
      }

      // 공지 작성
      async submitNotice(formData) {
        const response = await fetch(`${this.baseUrl}/notice/createNotice`, {
          method: 'post',
          headers: this.headers,
          body: JSON.stringify(formData)
        });
        const responseData = await response.json();
        const data = responseData.data; // 실제 데이터는 response.data에 있음
      
        console.log(responseData); // 데이터 확인
        return data;
      }

      // 공지 상세페이지
      async getNoticeDetail(id) {
        console.log(id)
        const response = await fetch(`${this.baseUrl}/notice/${id}`, {
          method: 'GET',
          headers: this.headers,
        });
        const responseData = await response.json();
        const data = responseData.data; // 실제 데이터는 response.data에 있음
      
        console.log(data); // 데이터 확인
        return data;
      }
};

export default NoticeService;