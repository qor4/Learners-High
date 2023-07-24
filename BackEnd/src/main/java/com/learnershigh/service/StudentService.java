package com.learnershigh.service;

import com.learnershigh.domain.StudentWishlist;
import com.learnershigh.dto.WishDto;
import com.learnershigh.repository.ClassRepository;
import com.learnershigh.repository.StudentWishlistRepository;
import com.learnershigh.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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

}
