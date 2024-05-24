class ReportService{
    constructor() {
        // HTTP 클라이언트 설정 및 기본 URL 설정
        this.baseUrl = 'http://localhost:8080';
        this.headers = {
          'Content-Type': 'application/json',
          // 필요에 따라 인증 헤더나 기타 헤더 추가 가능
        };
      }

      // 제보 게시판 리스트 불러오기
      async getReportList(lastId) {
        console.log(lastId)
        const queryParams = lastId ? `?lastId=${lastId}` : '';
        const response = await fetch(`${this.baseUrl}/report${queryParams}`, {
          method: 'GET',
          headers: this.headers,
        });
        const responseData = await response.json();
        const data = responseData.data; // 실제 데이터는 response.data에 있음
      
        console.log(data); // 데이터 확인
        return data;
      }

      // 제보 작성
      async submitReport(formData) {
        const response = await fetch(`${this.baseUrl}/report/createReport`, {
          method: 'post',
          headers: this.headers,
          body: JSON.stringify(formData)
        });
        const responseData = await response.json();
        const data = responseData.data; // 실제 데이터는 response.data에 있음
      
        console.log(data); // 데이터 확인
        return data;
      }

      //제보 게시글 상세페이지
      async getReportDetail(id) {
        console.log(id)
        const response = await fetch(`${this.baseUrl}/report/${id}`, {
          method: 'GET',
          headers: this.headers,
        });
        const responseData = await response.json();
        const data = responseData.data; // 실제 데이터는 response.data에 있음
      
        console.log(data); // 데이터 확인
        return data;
      }

      // 제보게시글 삭제
      async deleteReport(id) {
        try {
            const response = await fetch(`${this.baseUrl}/report/${id}`, {
                method: 'DELETE', // DELETE 메서드 사용
                headers: this.headers, // 필요한 헤더 추가
            });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response
        } catch (error) {
            console.error('Error deleting report:', error);
        }
    }

    // 제보게시글 수정
    async editReport(formData, id) {
      const response = await fetch(`${this.baseUrl}/report/${id}`, {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify(formData)
      });
      return response;
    }
};

export default ReportService;