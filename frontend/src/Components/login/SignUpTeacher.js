import React, {useState} from "react"

// 강사 전용 이력
const [companyName, setCompanyName] = useState('') // 회사명 varchar(20) ~ 이건 좀 길게 해도 될듯?
const [departName, setDepartName] = useState('') // 부서명 varchar(20) ~ 얘 역시...
const [hireStartDate, setHireStartDate] = useState() // 경력 시작 // 형식: yyyy.mm
const [hireEndDate, setHireEndDate] = useState() // 경력 끝 연월

// 강사 전용 학위
const [universityName, setUniversityName] = useState('') // varchar(20)
const [majorName, setMajorName] = useState('') // varchar(90) // 전공명
const [degree, setDegree] = useState('') // 학위종류 varchar(10) ~ 수정 가능
const [eduCareerDate, setEduCareerDate] = useState('') // 입학연월
const [eduCareerDated, setEduCareerDated] = useState('') // 졸업연월

