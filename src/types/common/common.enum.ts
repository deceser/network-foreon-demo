enum EGender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Others',
}

enum EVolumeKey {
  ALL = '',
  UNDER_10_000 = 'under_10_000',
  RANGE_10000_50000 = 'range_10000_50000',
  RANGE_50000_100000 = 'range_50000_100000',
  OVER_100000 = 'over_100000',
}

enum EStatusKey {
  ALL = '',
  ACTIVE = 'ACTIVE',
  ENDED = 'ENDED',
}

enum ESortKey {
  VOLUME = 'Volume',
  NEWEST = 'Newest',
  ENDED_RECENTLY = 'EndingRecently',
  ENDING_SOON = 'EndingSoon',
}

enum EMarketTypes {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
}

enum EResolveStatus {
  NOT_RESOLVED = 0,
  ONGOING = 1,
  RESOLVED = 2,
}

export {
  EGender,
  EVolumeKey,
  EStatusKey,
  EResolveStatus,
  EMarketTypes,
  ESortKey,
};
