/**
 * API请求工具
 * 统一管理所有API调用
 */

// 从环境变量获取API地址，添加兜底值（防止环境变量不存在）
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

/**
 * 获取存储的token
 */
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

/**
 * 保存token
 */
export const saveToken = (token: string): void => {
  localStorage.setItem('token', token);
};

/**
 * 清除token
 */
export const clearToken = (): void => {
  localStorage.removeItem('token');
};

/**
 * 通用API请求函数
 * 类似C语言中的通用网络请求函数
 */
const request = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  // 如果有token，添加到请求头
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // 拼接完整URL，添加/api前缀（和后端路由匹配）
  const url = `${API_BASE_URL}/api${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include' // 新增：解决跨域凭证携带问题
    });

    const data = await response.json();

    // 如果响应不成功，抛出错误
    if (!response.ok) {
      throw new Error(data.message || '请求失败');
    }

    return data;
  } catch (error) {
    console.error('API请求失败:', error);
    throw error;
  }
};

/**
 * GET请求
 */
export const get = <T>(endpoint: string): Promise<T> => {
  return request<T>(endpoint, { method: 'GET' });
};

/**
 * POST请求
 */
export const post = <T>(endpoint: string, body?: any): Promise<T> => {
  return request<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

/**
 * PUT请求
 */
export const put = <T>(endpoint: string, body?: any): Promise<T> => {
  return request<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
};

/**
 * DELETE请求
 */
export const del = <T>(endpoint: string): Promise<T> => {
  return request<T>(endpoint, { method: 'DELETE' });
};

/**
 * 文件上传请求
 */
export const uploadFile = async <T>(
  endpoint: string,
  file: File,
  additionalData?: Record<string, string>
): Promise<T> => {
  const token = getToken();
  const formData = new FormData();
  formData.append('file', file);
  
  // 添加其他表单数据
  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // 拼接完整URL，添加/api前缀
  const url = `${API_BASE_URL}/api${endpoint}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: formData,
    credentials: 'include' // 新增：文件上传也携带跨域凭证
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || '上传失败');
  }

  return data;
};

// ========== 认证相关API ==========

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  phone?: string;
  email?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      username: string;
      role: string;
    };
  };
}

/**
 * 用户登录
 */
export const login = (data: LoginRequest): Promise<AuthResponse> => {
  return post<AuthResponse>('/auth/login', data);
};

/**
 * 用户注册
 */
export const register = (data: RegisterRequest): Promise<AuthResponse> => {
  return post<AuthResponse>('/auth/register', data);
};

/**
 * 获取当前用户信息
 */
export const getCurrentUser = (): Promise<any> => {
  return get('/auth/me');
};

// ========== 合同相关API ==========

/**
 * 上传合同
 */
export const uploadContract = (file: File): Promise<any> => {
  return uploadFile('/contract/upload', file);
};

/**
 * 分析合同
 */
export const analyzeContract = (contractId: string): Promise<any> => {
  return post('/contract/analyze', { contractId });
};

/**
 * 获取合同列表（修复语法错误：补全参数行的}）
 */
export const getContractList = (params?: { page?: number; limit?: number; status?: string }) => {
  const query = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        query.append(key, value.toString());
      }
    });
  }
  const queryString = query.toString();
  return get(`/contract/list${queryString ? '?' + queryString : ''}`);
};

/**
 * 获取合同详情
 */
export const getContract = (id: string): Promise<any> => {
  return get(`/contract/${id}`);
};

// ========== 证据相关API ==========

/**
 * 上传证据
 */
export const uploadEvidence = (
  file: File,
  metadata?: {
    description?: string;
    relatedComplaintId?: string;
    relatedContractId?: string;
    location?: string;
  }
): Promise<any> => {
  const formData: Record<string, string> = {};
  if (metadata) {
    Object.entries(metadata).forEach(([key, value]) => {
      if (value) {
        formData[key] = value;
      }
    });
  }
  return uploadFile('/evidence/upload', file, formData);
};

/**
 * 获取证据列表（修复语法错误：补全函数定义）
 */
export const getEvidenceList = (params?: { page?: number; limit?: number; type?: string }): Promise<any> => {
  const query = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        query.append(key, value.toString());
      }
    });
  }
  const queryString = query.toString();
  return get(`/evidence/list${queryString ? '?' + queryString : ''}`);
};

/**
 * 获取证据详情
 */
export const getEvidence = (id: string): Promise<any> => {
  return get(`/evidence/${id}`);
};

/**
 * 验证证据完整性
 */
export const verifyEvidence = (id: string): Promise<any> => {
  return post('/evidence/verify', { id });
};

// ========== 误导检测相关API ==========

/**
 * 上传文件并分析
 */
export const uploadAndAnalyze = (file: File): Promise<any> => {
  return uploadFile('/detection/upload', file);
};

/**
 * 获取检测报告
 */
export const getDetectionReport = (id: string): Promise<any> => {
  return get(`/detection/reports/${id}`);
};

/**
 * 获取检测报告列表（修复语法错误：Promis → Promise）
 */
export const getDetectionReportList = (params?: { page?: number; limit?: number }): Promise<any> => {
  const query = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        query.append(key, value.toString());
      }
    });
  }
  const queryString = query.toString();
  return get(`/detection/reports${queryString ? '?' + queryString : ''}`);
};

// ========== 投诉相关API ==========

export interface ComplaintRequest {
  type: 'insurance' | 'agent' | 'tongchou';
  title: string;
  content: string;
  evidenceIds?: string[];
}

/**
 * 创建投诉
 */
export const createComplaint = (data: ComplaintRequest): Promise<any> => {
  return post('/complaint/create', data);
};

/**
 * 获取投诉列表（修复语法错误：补全参数行的}）
 */
export const getComplaintList = (params?: { page?: number; limit?: number; status?: string }) => {
  const query = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        query.append(key, value.toString());
      }
    });
  }
  const queryString = query.toString();
  return get(`/complaint/list${queryString ? '?' + queryString : ''}`);
};

/**
 * 获取投诉详情
 */
export const getComplaint = (id: string): Promise<any> => {
  return get(`/complaint/${id}`);
};

/**
 * 获取监管机构信息
 */
export const getAgencies = (): Promise<any> => {
  return get('/complaint/agencies/list');
};

// ========== 语音相关API ==========

/**
 * 上传语音文件
 */
export const uploadVoice = (file: File): Promise<any> => {
  return uploadFile('/voice/upload', file);
};

/**
 * 获取语音分析结果
 */
export const getVoiceResult = (id: string): Promise<any> => {
  return get(`/voice/result/${id}`);
};

// ========== 数据看板API ==========

/**
 * 获取统计数据
 */
export const getDashboardStats = (): Promise<any> => {
  return get('/dashboard/stats');
};

/**
 * 获取区域数据
 */
export const getDashboardRegions = (): Promise<any> => {
  return get('/dashboard/regions');
};

// ========== 学习中心API ==========

export interface SaveTestResultRequest {
  testType: string;
  score: number;
  passed: boolean;
  answers: Record<number, string>;
}

export interface TestResultResponse {
  success: boolean;
  message: string;
  result: {
    id: string;
    userId: string;
    testType: string;
    score: number;
    passed: boolean;
    answers: Record<number, string>;
    createdAt: string;
    updatedAt: string;
  };
}

export interface GetTestResultsResponse {
  success: boolean;
  results: Array<{
    id: string;
    userId: string;
    testType: string;
    score: number;
    passed: boolean;
    answers: Record<number, string>;
    createdAt: string;
    updatedAt: string;
  }>;
}

/**
 * 保存测试结果（修复语法错误：补全函数定义）
 */
export const saveTestResult = (data: SaveTestResultRequest): Promise<TestResultResponse> => {
  return post<TestResultResponse>('/learning/save-test-result', data);
};

/**
 * 获取用户的测试结果
 */
export const getTestResults = (): Promise<GetTestResultsResponse> => {
  return get<GetTestResultsResponse>('/learning/get-test-results');
};