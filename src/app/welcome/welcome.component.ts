import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent implements OnInit {
  activeIndex: number | null = null;
  accordionData = [
    {
      question: 'What is Netflix?',
      answer:
        'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices.',
    },
    {
      question: 'How much does Netflix cost?',
      answer:
        'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts.',
    },
  ];
  carouselImgSource = [
    { id: 1, src: 'images/snowy.webp' },
    { id: 2, src: 'images/scotland.webp' },
    { id: 3, src: 'images/partly_cloudy.webp' },
    { id: 4, src: 'images/mountains.webp' },
    { id: 5, src: 'images/overcast_sunset.webp' },
    { id: 6, src: 'images/convective_clouds.webp' },
    { id: 7, src: 'images/features_background.webp' },
  ];

  currentIndex = 0;
  itemsPerView = 6;

  ngOnInit() {}
  toggleAccordian(i: number) {
    this.activeIndex = this.activeIndex === i ? null : i;
  }
  get currentItems() {
    return this.carouselImgSource.slice(
      this.currentIndex,
      this.currentIndex + this.itemsPerView,
    );
  }

  next() {
    if (this.currentIndex + this.itemsPerView < this.carouselImgSource.length) {
      this.currentIndex++;
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
