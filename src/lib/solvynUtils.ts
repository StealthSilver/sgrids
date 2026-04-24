// Helper function to create straight paths with rounded corners
export const createCurvedPath = (x1: number, y1: number, x2: number, y2: number): string => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  
  // Create a path that goes horizontally first, then vertically (L-shaped with rounded corner)
  const midX = x1 + dx * 0.5;
  const midY = y1 + dy * 0.5;
  
  // Use rounded corners instead of sharp angles
  const cornerRadius = 15;
  
  // Calculate distances
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  
  if (absDx > cornerRadius * 2 && absDy > cornerRadius * 2) {
    // Determine direction
    const dirX = dx > 0 ? 1 : -1;
    const dirY = dy > 0 ? 1 : -1;
    
    // Path goes: start -> horizontal -> rounded corner -> vertical -> end
    const cornerX = midX;
    const cornerY1 = y1 + dirY * cornerRadius;
    const cornerY2 = y2 - dirY * cornerRadius;
    
    return `M ${x1} ${y1} L ${cornerX - dirX * cornerRadius} ${y1} Q ${cornerX} ${y1} ${cornerX} ${cornerY1} L ${cornerX} ${cornerY2} Q ${cornerX} ${y2} ${cornerX + dirX * cornerRadius} ${y2} L ${x2} ${y2}`;
  } else {
    // Fallback to simple straight line for very short distances
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }
};

// Helper function to create smooth curved paths using cubic bezier curves.
// Designed for a top hub (origin) connecting to targets below it.
// The path leaves the origin flowing straight downward and arrives at the
// target flowing straight downward as well, producing clean, symmetric
// "power grid" style connectors that spread outward naturally.
export const createSmoothCurvedPath = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  curvature: number = 0.3 // Controls how quickly the line eases into vertical (0 = straight, higher = more vertical at endpoints)
): string => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 10) {
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  // Vertical offset for control points. Using |dy| (instead of total distance)
  // keeps the curve well-behaved when the target is mostly below the origin,
  // which is exactly the layout we have (logo above, icons below).
  const verticalReach = Math.max(Math.abs(dy) * (0.4 + curvature), 40);

  // Control point 1 sits directly below the origin -> line leaves the logo
  // flowing straight down.
  const c1x = x1;
  const c1y = y1 + verticalReach;

  // Control point 2 sits directly above the target -> line enters the icon
  // flowing straight down into its top edge.
  const c2x = x2;
  const c2y = y2 - verticalReach;

  return `M ${x1} ${y1} C ${c1x} ${c1y} ${c2x} ${c2y} ${x2} ${y2}`;
};

// Helper function to create linear paths with rounded corners (L-shaped)
export const createLinearPath = (x1: number, y1: number, x2: number, y2: number): string => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  
  // Create an L-shaped path: horizontal first, then vertical (with rounded corner)
  const midX = x1 + dx * 0.5;
  const cornerRadius = 15;
  
  // Calculate distances
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  
  if (absDx > cornerRadius * 2 && absDy > cornerRadius * 2) {
    // Determine direction
    const dirX = dx > 0 ? 1 : -1;
    const dirY = dy > 0 ? 1 : -1;
    
    // Path goes: start -> horizontal -> rounded corner -> vertical -> end
    const cornerX = midX;
    const cornerY1 = y1 + dirY * cornerRadius;
    const cornerY2 = y2 - dirY * cornerRadius;
    
    return `M ${x1} ${y1} L ${cornerX - dirX * cornerRadius} ${y1} Q ${cornerX} ${y1} ${cornerX} ${cornerY1} L ${cornerX} ${cornerY2} Q ${cornerX} ${y2} ${cornerX + dirX * cornerRadius} ${y2} L ${x2} ${y2}`;
  } else {
    // Fallback to simple straight line for very short distances
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }
};

