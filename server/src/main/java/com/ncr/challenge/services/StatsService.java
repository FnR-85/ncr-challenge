package com.ncr.challenge.services;

import java.util.ArrayList;

import com.ncr.challenge.entities.User;
import com.ncr.challenge.models.StatsModel;

import org.springframework.stereotype.Service;

@Service
public class StatsService {

  public StatsModel calculateStats(ArrayList<User> users) {
    StatsModel stats = new StatsModel();
    
    Short totalUsers = Short.valueOf((short) users.size());
    Short numberOfCashiers = Short.valueOf((short) users.stream().filter((User user) -> { return user.getProfile() == 1; }).count());
    Short numberOfSupervisors = Short.valueOf((short) users.stream().filter((User user) -> { return user.getProfile() == 2; }).count());
    stats.setNumberOfCashiers(numberOfCashiers);
    stats.setNumberOfSupervisors(numberOfSupervisors);
    if (totalUsers > 0) {
      stats.setPercentageOfCashiersOverTotalUsers((numberOfCashiers * 100) / totalUsers);
      stats.setPercentageOfSupervisorsOverTotalUsers((numberOfSupervisors * 100) / totalUsers);
    }

    return stats;
  }
  
}
