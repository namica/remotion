import {
	registerVideo,
	spring2,
	SpringConfig,
	useCurrentFrame,
	useVideoConfig,
} from '@remotion/core';
import {mix} from 'polished';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	background-color: white;
	flex: 1;
`;

const Label = styled.div`
	font-size: 260px;
	color: black;
	font-weight: 700;
	font-family: -apple-system, BlinkMacSystemFont, sans-serif;
	text-align: center;
	transform: scaleX(1);
	line-height: 1em;
`;
export const StaggerType = () => {
	const types = 4;
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();
	const springConfig: SpringConfig = {
		damping: 10,
		mass: 1.4,
		stiffness: 100,
		restSpeedThreshold: 0.00001,
		restDisplacementThreshold: 0.0001,
		overshootClamping: false,
	};
	const progress = spring2({
		config: springConfig,
		frame,
		from: 0,
		to: 1,
		fps: videoConfig.fps,
	});
	const letterSpacing = '0.3em';
	return (
		<Container
			style={{
				flex: 1,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div>
				{new Array(types)
					.fill(true)
					.map((_, i) => {
						return i;
					})
					.map((i) => {
						const ratio = i / types;
						const isSecondHalf = frame > videoConfig.durationInFrames / 2;
						const opacity = frame / (videoConfig.durationInFrames / 2) > ratio;
						const stroking = (() => {
							if (!isSecondHalf) {
								return i % 2 === 0;
							}
							return Math.ceil(frame / 10) % 2 === i % 2;
						})();
						const color = mix(ratio, '#fff', '#000');
						return (
							<Label
								style={{
									...(stroking
										? {}
										: {
												WebkitTextStrokeColor: color,
												WebkitTextStrokeWidth: 8,
												WebkitTextFillColor: 'white',
										  }),
									opacity: Number(opacity),
									width: 2000,
									marginLeft: -(2000 - videoConfig.width) / 2,
									marginTop: -20,
								}}
							>
								{'beta'}
							</Label>
						);
					})}
			</div>
		</Container>
	);
};

registerVideo(StaggerType, {
	width: 1080,
	height: 1080,
	fps: 30,
	durationInFrames: 30 * 1.5,
});