import {render, screen, waitFor} from '@testing-library/react';
import {expect, vi} from 'vitest';
import App from './App';
import { initMarkdownFileMap, initImageFileMap } from './utils/file/fileUtils';
import {MemoryRouter} from "react-router-dom";

beforeAll(() => {
  vi.mock('./utils/file/fileUtils', () => ({
    initMarkdownFileMap: vi.fn(),
    initImageFileMap: vi.fn(),
    getMarkdownFileSet: vi.fn(() => new Set()),
  }));
})

afterAll(() => {
  vi.clearAllMocks();
})

describe('App 컴포넌트 렌더링 시', () => {
  it('초기화 메서드가 호출된다.', async () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    
    await waitFor(() => {
      expect(initMarkdownFileMap).toHaveBeenCalled();
      expect(initImageFileMap).toHaveBeenCalled();
    });
  });
  
  it('아직 초기화 되지 않았을 때는 로딩 컴포넌트가 렌더링된다.', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    
    expect(screen.getByText('로딩중...')).toBeInTheDocument();
  });
  
  it('초기화가 완료되면 App이 렌더링 된다.', async () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    await waitFor(() => {
      expect(screen.queryByText('로딩중...')).not.toBeInTheDocument();
    });
  });
});