const PROFILE_DATA = [
    {
      name: 'Kishan Walecha',
      mobile_no: '8808425292',
      dob: '1995-12-24',
      gender: 'M',
      height: '5\'8"',
      language: [
        {id: 1, name: 'English'},
        {id: 2, name: 'Spanish'},
        {id: 4, name: 'Hindi'},
        {id: 5, name: 'Arabic'},
      ],
      belief: [{id: 2, name: 'Islam'}],
      interest: [
        {id: 7, name: 'Dancing', interest: {id: 1, name: 'Hobbies'}},
        {id: 6, name: 'Cooking', interest: {id: 1, name: 'Hobbies'}},
        {id: 1, name: 'Watching movies', interest: {id: 1, name: 'Hobbies'}},
        {id: 10, name: 'Writing', interest: {id: 1, name: 'Hobbies'}},
        {id: 3, name: 'Traveling', interest: {id: 1, name: 'Hobbies'}},
        {id: 12, name: 'Bollywood', interest: {id: 2, name: 'Music'}},
        {id: 16, name: 'Desi Rap', interest: {id: 2, name: 'Music'}},
        {id: 18, name: 'Rock music', interest: {id: 2, name: 'Music'}},
        {id: 32, name: 'vodka', interest: {id: 3, name: 'Drinks'}},
        {id: 31, name: 'Rum', interest: {id: 3, name: 'Drinks'}},
        {id: 23, name: 'Cocktails', interest: {id: 3, name: 'Drinks'}},
        {id: 25, name: 'Beer', interest: {id: 3, name: 'Drinks'}},
        {id: 27, name: 'Whiskey', interest: {id: 3, name: 'Drinks'}},
      ],
      profile_pic_1: 'https://adatingapp.s3.amazonaws.com/217.jpg',
      profile_pic_2: 'https://adatingapp.s3.amazonaws.com/1000000161.jpg',
      profile_pic_3: 'https://adatingapp.s3.amazonaws.com/1000000201.jpg',
      date_choice: [
        {
          id: 61,
          created_at: '2023-12-31T13:07:34.518357Z',
          updated_at: '2023-12-31T13:07:34.518377Z',
          date_type: 'CoffeeDate',
          time: '30 min',
          coins: '500',
          user: 80,
        },
        {
          id: 62,
          created_at: '2023-12-31T13:07:34.520495Z',
          updated_at: '2023-12-31T13:07:34.520509Z',
          date_type: 'MovieDate',
          time: '150 min',
          coins: '1500',
          user: 80,
        },
        {
          id: 63,
          created_at: '2023-12-31T13:07:34.522254Z',
          updated_at: '2023-12-31T13:07:34.522269Z',
          date_type: 'Restaurant',
          time: '60 min',
          coins: '900',
          user: 80,
        },
        {
          id: 64,
          created_at: '2023-12-31T13:07:34.523971Z',
          updated_at: '2023-12-31T13:07:34.523985Z',
          date_type: 'LunchDate',
          time: '90 min',
          coins: '650',
          user: 80,
        },
      ],
      about: null,
      id: 80,
      user_save: false,
    },
    {
      name: 'ashu',
      mobile_no: '8318979260',
      dob: '2023-12-01',
      gender: 'M',
      height: '5.4',
      language: [{id: 1, name: 'English'}],
      belief: [{id: 1, name: 'Christianity'}],
      interest: [
        {id: 1, name: 'Watching movies', interest: {id: 1, name: 'Hobbies'}},
        {id: 2, name: 'Reading', interest: {id: 1, name: 'Hobbies'}},
        {id: 12, name: 'Bollywood', interest: {id: 2, name: 'Music'}},
        {id: 23, name: 'Cocktails', interest: {id: 3, name: 'Drinks'}},
        {id: 24, name: 'Tea', interest: {id: 3, name: 'Drinks'}},
      ],
      profile_pic_1:
        'https://adatingapp.s3.amazonaws.com/WhatsApp Image 2023-11-20 at 11.40.50.jpeg',
      profile_pic_2: null,
      profile_pic_3: null,
      date_choice: [
        {
          id: 65,
          created_at: '2023-12-31T14:18:30.390797Z',
          updated_at: '2023-12-31T14:18:30.390816Z',
          date_type: 'Coffee Date',
          time: '45 mins',
          coins: '45',
          user: 81,
        },
      ],
      about: null,
      id: 81,
      user_save: false,
    },
    {
      name: 'Vishal',
      mobile_no: '7011386809',
      dob: '1995-09-04',
      gender: 'M',
      height: '5\'10"',
      language: [
        {id: 1, name: 'English'},
        {id: 2, name: 'Spanish'},
        {id: 4, name: 'Hindi'},
        {id: 7, name: 'Bengali'},
      ],
      belief: [{id: 3, name: 'Hinduism'}],
      interest: [
        {id: 1, name: 'Watching movies', interest: {id: 1, name: 'Hobbies'}},
        {id: 7, name: 'Dancing', interest: {id: 1, name: 'Hobbies'}},
        {id: 2, name: 'Reading', interest: {id: 1, name: 'Hobbies'}},
        {id: 3, name: 'Traveling', interest: {id: 1, name: 'Hobbies'}},
        {id: 8, name: 'Acting', interest: {id: 1, name: 'Hobbies'}},
        {id: 21, name: 'Vocal music', interest: {id: 2, name: 'Music'}},
        {id: 12, name: 'Bollywood', interest: {id: 2, name: 'Music'}},
        {id: 15, name: 'Punjabi', interest: {id: 2, name: 'Music'}},
        {id: 13, name: 'Folk music', interest: {id: 2, name: 'Music'}},
        {id: 18, name: 'Rock music', interest: {id: 2, name: 'Music'}},
        {id: 20, name: 'Instrumental', interest: {id: 2, name: 'Music'}},
        {id: 23, name: 'Cocktails', interest: {id: 3, name: 'Drinks'}},
        {id: 31, name: 'Rum', interest: {id: 3, name: 'Drinks'}},
        {id: 29, name: 'Coffee', interest: {id: 3, name: 'Drinks'}},
        {id: 32, name: 'vodka', interest: {id: 3, name: 'Drinks'}},
        {id: 24, name: 'Tea', interest: {id: 3, name: 'Drinks'}},
        {id: 27, name: 'Whiskey', interest: {id: 3, name: 'Drinks'}},
        {id: 30, name: 'Soft drinks', interest: {id: 3, name: 'Drinks'}},
      ],
      profile_pic_1: 'https://adatingapp.s3.amazonaws.com/1000000162.jpg',
      profile_pic_2: 'https://adatingapp.s3.amazonaws.com/1000000096.jpg',
      profile_pic_3: 'https://adatingapp.s3.amazonaws.com/1000000189.jpg',
      date_choice: [
        {
          id: 66,
          created_at: '2024-01-01T14:59:17.749281Z',
          updated_at: '2024-01-01T14:59:17.749303Z',
          date_type: 'CoffeeDate',
          time: '30 min',
          coins: '150',
          user: 82,
        },
        {
          id: 67,
          created_at: '2024-01-01T14:59:17.751977Z',
          updated_at: '2024-01-01T14:59:17.751992Z',
          date_type: 'MovieDate',
          time: '150 min',
          coins: '1200',
          user: 82,
        },
        {
          id: 68,
          created_at: '2024-01-01T14:59:17.754209Z',
          updated_at: '2024-01-01T14:59:17.754223Z',
          date_type: 'Restaurant',
          time: '60 min',
          coins: '750',
          user: 82,
        },
        {
          id: 69,
          created_at: '2024-01-01T14:59:17.756226Z',
          updated_at: '2024-01-01T14:59:17.756239Z',
          date_type: 'LunchDate',
          time: '90 min',
          coins: '1000',
          user: 82,
        },
      ],
      about: null,
      id: 82,
      user_save: true,
    },
    {
      name: 'Piyush',
      mobile_no: '9569887287',
      dob: '2000-11-05',
      gender: 'M',
      height: '5\'11"',
      language: [
        {id: 1, name: 'English'},
        {id: 4, name: 'Hindi'},
      ],
      belief: [{id: 3, name: 'Hinduism'}],
      interest: [
        {id: 1, name: 'Watching movies', interest: {id: 1, name: 'Hobbies'}},
        {id: 13, name: 'Folk music', interest: {id: 2, name: 'Music'}},
        {id: 24, name: 'Tea', interest: {id: 3, name: 'Drinks'}},
      ],
      profile_pic_1:
        'https://adatingapp.s3.amazonaws.com/IMG-20231231-WA0061.jpg',
      profile_pic_2:
        'https://adatingapp.s3.amazonaws.com/IMG-20231231-WA0049.jpg',
      profile_pic_3:
        'https://adatingapp.s3.amazonaws.com/IMG-20240101-WA0008.jpg',
      date_choice: [
        {
          id: 70,
          created_at: '2024-01-01T15:25:31.648941Z',
          updated_at: '2024-01-01T15:25:31.648956Z',
          date_type: 'CoffeeDate',
          time: '30 min',
          coins: '500',
          user: 83,
        },
        {
          id: 71,
          created_at: '2024-01-01T15:25:31.650861Z',
          updated_at: '2024-01-01T15:25:31.650875Z',
          date_type: 'MovieDate',
          time: '150 min',
          coins: '1000',
          user: 83,
        },
        {
          id: 72,
          created_at: '2024-01-01T15:25:31.652756Z',
          updated_at: '2024-01-01T15:25:31.652770Z',
          date_type: 'Restaurant',
          time: '60 min',
          coins: '2000',
          user: 83,
        },
        {
          id: 73,
          created_at: '2024-01-01T15:25:31.654444Z',
          updated_at: '2024-01-01T15:25:31.654458Z',
          date_type: 'LunchDate',
          time: '60 min',
          coins: '5000',
          user: 83,
        },
      ],
      about: null,
      id: 83,
      user_save: true,
    },
    {
      name: 'Dev',
      mobile_no: '8887539246',
      dob: '1996-12-10',
      gender: 'M',
      height: '5\'8"',
      language: [
        {id: 1, name: 'English'},
        {id: 4, name: 'Hindi'},
      ],
      belief: [{id: 3, name: 'Hinduism'}],
      interest: [
        {id: 8, name: 'Acting', interest: {id: 1, name: 'Hobbies'}},
        {id: 13, name: 'Folk music', interest: {id: 2, name: 'Music'}},
        {id: 23, name: 'Cocktails', interest: {id: 3, name: 'Drinks'}},
        {id: 24, name: 'Tea', interest: {id: 3, name: 'Drinks'}},
      ],
      profile_pic_1:
        'https://adatingapp.s3.amazonaws.com/IMG_20240107_003024_493.jpg',
      profile_pic_2:
        'https://adatingapp.s3.amazonaws.com/IMG_20240107_004607_235.jpg',
      profile_pic_3:
        'https://adatingapp.s3.amazonaws.com/IMG_20240107_003024_493.jpg',
      date_choice: [
        {
          id: 74,
          created_at: '2024-01-08T13:26:48.579058Z',
          updated_at: '2024-01-08T13:26:48.579073Z',
          date_type: 'CoffeeDate',
          time: '45 min',
          coins: '500',
          user: 84,
        },
        {
          id: 75,
          created_at: '2024-01-08T13:26:48.581167Z',
          updated_at: '2024-01-08T13:26:48.581182Z',
          date_type: 'MovieDate',
          time: '150 min',
          coins: '1000',
          user: 84,
        },
        {
          id: 76,
          created_at: '2024-01-08T13:26:48.582984Z',
          updated_at: '2024-01-08T13:26:48.583003Z',
          date_type: 'Restaurant',
          time: '60 min',
          coins: '2000',
          user: 84,
        },
        {
          id: 77,
          created_at: '2024-01-08T13:26:48.584798Z',
          updated_at: '2024-01-08T13:26:48.584812Z',
          date_type: 'LunchDate',
          time: '90 min',
          coins: '3000',
          user: 84,
        },
      ],
      about: null,
      id: 84,
      user_save: false,
    },
  ];

  export {
    PROFILE_DATA
  }