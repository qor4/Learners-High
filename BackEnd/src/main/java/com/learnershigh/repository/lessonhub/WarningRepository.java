package com.learnershigh.repository.lessonhub;

import com.learnershigh.domain.lessonhub.Warning;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WarningRepository extends JpaRepository<Warning, Long> {
}

