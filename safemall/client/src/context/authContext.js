import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({authService, children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(undefined);
    const [isAdmin, setisAdmin] = useState(false);
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        // 페이지 로드 시 로컬 스토리지에서 토큰과 닉네임 가져오기
        const token = sessionStorage.getItem('token');
        const storedNickname = sessionStorage.getItem('NICKNAME');

        if (token && storedNickname) {
            // 로컬 스토리지에서 토큰과 닉네임이 있는 경우
            setIsLoggedIn(true);
            setNickname(storedNickname);
        } else {
            // 로컬 스토리지에 토큰이 없는 경우
            setIsLoggedIn(false);
            setNickname('');
        }
    }, [authService]);

    const signUp = async (data) => {
        try {
            const user = await authService.signup(data); //Promise를 반환하는 함수로 가정
            setIsLoggedIn(user); // 사용자 정보를 받아와서 로그인 상태를 설정
        } catch (error) {
            console.error('Error signing up:', error);
        }
    }

    const login = (data) => {
        console.log(data)
        const generateToken = () => {
            return Math.random().toString(36).substr(2);
        };
        const token = generateToken();
        sessionStorage.setItem('jwt', token);
        sessionStorage.setItem('nickname', data.Nickname);

        if(data.isAdmin) setisAdmin(true)
        console.log('로그인 성공:', { token, nickname: data.Nickname });
        setIsLoggedIn(true);
        setNickname(sessionStorage.getItem('nickname'));
    };

    const logout = () => {
        // 실제 로그아웃 로직
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('NICKNAME');
        setIsLoggedIn(false);
        setNickname('');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, nickname, isAdmin, signUp }}>
            {children}
        </AuthContext.Provider>
    );
};