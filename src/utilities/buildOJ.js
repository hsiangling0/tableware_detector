let classesDir = {
    1: {
      name: 'friendly_chopsticks',
      id: 1,
    },
    2: {
      name: 'unfriendly_chopsticks',
      id: 2,
    },
    3: {
      name: 'friendly_spoon',
      id: 3,
    },
    4: {
      name: 'unfriendly_spoon',
      id: 4,
    },
    5: {
      name: 'friendly_bottle',
      id: 5,
    },
    6: {
      name: 'unfriendly_bottle',
      id: 6,
    },
    7: {
      name: 'friendly_drinkingstraw',
      id: 7,
    },
    8: {
      name: 'unfriendly_drinkingstraw',
      id: 8,
    },
    9: {
      name: 'friendly_fork',
      id: 9,
    },
    10: {
      name: 'unfriendly_fork',
      id: 10,
    }
  }
export function buildDetectedObjects(scores, threshold, boxes, classes,video_frame) {
  const detectionObjects = []

    scores[0].forEach((score, i) => {
      if (score > threshold) {
        const bbox = [];
        const minY = boxes[0][i][0] * video_frame.offsetHeight;
        const minX = boxes[0][i][1] * video_frame.offsetWidth;
        const maxY = boxes[0][i][2] * video_frame.offsetHeight;
        const maxX = boxes[0][i][3] * video_frame.offsetWidth;
        bbox[0] = minX;
        bbox[1] = minY;
        bbox[2] = maxX - minX;
        bbox[3] = maxY - minY;
        detectionObjects.push({
          class: classes[i],
          label: classesDir[classes[i]].name,
          score: score.toFixed(4),
          bbox: bbox
        })
      }
    })
    return detectionObjects
}