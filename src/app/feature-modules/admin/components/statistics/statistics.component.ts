import { StatisticService, IEmailStats } from './../../../../services/statistics.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  emailStats: IEmailStats;

  constructor(private statsService: StatisticService) {}

  ngOnInit() {
    this.getEmailStats();
  }

  getEmailStats() {
    this.statsService.getEmailStatistics().subscribe((data) => {
      this.emailStats = data;
    });
  }
}
