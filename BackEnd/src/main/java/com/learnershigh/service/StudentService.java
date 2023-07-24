package com.learnershigh.service;

import com.learnershigh.domain.StudentWishlist;
import com.learnershigh.dto.WishDto;
import com.learnershigh.repository.ClassRepository;
import com.learnershigh.repository.StudentWishlistRepository;
import com.learnershigh.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StudentService {

    private final StudentWishlistRepository studentWishlistRepository;
    private final UserRepository userRepository;
    private final ClassRepository classRepository;

    @Transactional
    public void wish(WishDto wishDto) {
        StudentWishlist studentWishlist = new StudentWishlist();
        studentWishlist.setUserNo(userRepository.findByUserNo(wishDto.getUserNo()));
        studentWishlist.setClassNo(classRepository.findByClassNo(wishDto.getClassNo()));

        studentWishlistRepository.save(studentWishlist);
    }

    @Transactional
    public void deleteWish(Long userNo, Long classNo) {
        StudentWishlist studentWishlist = studentWishlistRepository.findByUserNoAndClassNo(userNo, classNo);
        if(studentWishlist==null){
            throw new BadCredentialsException("잘못된 위시 정보입니다.");
        }
        studentWishlistRepository.delete(studentWishlist);
    }
}
